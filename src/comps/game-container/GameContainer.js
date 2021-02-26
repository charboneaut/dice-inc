import "./GameContainer.css";
import { Component } from "react";
import GameBar from "../game-bar/GameBar";
import DiceContainer from "../dice-container/DiceContainer";
import { v4 } from "uuid";
import NeedsCash from "../alerts/NeedsCash";
import TooManySides from "../alerts/TooManySides";
import DevHatch from "../dev-hatch/DevHatch";
import helpRoll from "./helpers/helpRoll";
import Achievements from "../achievements/Achievements";
import AchieveAlert from "../alerts/AchieveAlert";
import detectAchievements from "./helpers/detectAchievements";
import { achievements } from "./achievements";
class GameContainer extends Component {
  state = {
    dice: [
      {
        id: v4(),
        sides: 1,
      },
    ],
    mulDice: [],
    cash: 0,
    show: false,
    difference: 0,
    tooManySides: false,
    currentRolls: [1],
    currentMulRolls: [],
    alertTimeout: null,
    combo: null,
    mulCombo: null,
    lastMulRoll: null,
    lastRoll: 0,
    lastNaturalRoll: 0,
    dev: false,
    achieveMode: false,
    achieveBonus: 100,
    achieveAlert: false,
    lastAchievement: null,
    rollCount: 0,
    saveMode: false,
    saveText: null,
    achievements: achievements,
  };
  handleAddMulDie = () => {
    let mulDiceStart = this.state.mulDice.length + 1;
    const diceCost = (mulDiceStart * 10) ** 4;
    if (this.state.cash < diceCost) {
      this.setState({
        show: true,
        difference: this.state.cash - diceCost,
      });
      this.handleAutoAlertClose();
      return;
    }
    if (this.state.mulDice.length >= 6) {
      this.setState({
        tooManySides: true,
      });
      this.handleAutoAlertClose();
      return;
    }
    this.setState({
      mulDice: [
        ...this.state.mulDice,
        {
          id: v4(),
          sides: 2,
        },
      ],
      cash: this.state.cash - diceCost,
      currentMulRolls: [...this.state.currentMulRolls, 1],
    });
  };
  handleRoll = () => {
    const rollData = helpRoll(this.state.dice, this.state.mulDice);
    this.setState({
      lastNaturalRoll: rollData.naturalRoll,
      currentRolls: rollData.rollsArr,
      cash:
        this.state.cash +
        Math.round((rollData.rollTotal * this.state.achieveBonus) / 100),
      lastRoll: Math.round(
        (rollData.rollTotal *
          rollData.mulRollTotal *
          rollData.comboData.combo *
          this.state.achieveBonus) /
          100
      ),
      lastMulRoll: rollData.mulRollTotal,
      currentMulRolls: rollData.mulRollsArr,
      combo: rollData.comboData.comboStr,
      rollCount: this.state.rollCount + 1,
    });
    this.checkIfAchievementsComplete();
  };
  handleUpgradeDie = (upgradedId) => {
    let newDice = this.state.dice.filter(function (die) {
      return die.id === upgradedId;
    });
    let upgradeCost = Math.round((newDice[0].sides * 3) ** 2);
    if (this.state.cash < upgradeCost) {
      this.setState({
        show: true,
        difference: this.state.cash - upgradeCost,
      });
      this.handleAutoAlertClose();
      return;
    }
    if (newDice[0].sides >= 20) {
      this.setState({
        tooManySides: true,
      });
      this.handleAutoAlertClose();
      return;
    }
    let oldDice = this.state.dice.filter(function (die) {
      return die.id !== upgradedId;
    });
    newDice[0].sides++;
    let combinedDice = [...oldDice, newDice[0]];
    let sortedDice = combinedDice.sort(function (die1, die2) {
      return die2.sides - die1.sides;
    });
    this.setState({
      dice: sortedDice,
      cash: this.state.cash - upgradeCost,
    });
  };
  handleUpgradeMulDie = (upgradedId) => {
    let newDice = this.state.mulDice.filter(function (die) {
      return die.id === upgradedId;
    });
    let upgradeCost = Math.round((newDice[0].sides * 20) ** 2);
    if (this.state.cash < upgradeCost) {
      this.setState({
        show: true,
        difference: this.state.cash - upgradeCost,
      });
      this.handleAutoAlertClose();
      return;
    }
    if (newDice[0].sides >= 20) {
      this.setState({
        tooManySides: true,
      });
      this.handleAutoAlertClose();
      return;
    }
    let oldDice = this.state.mulDice.filter(function (die) {
      return die.id !== upgradedId;
    });
    newDice[0].sides++;
    let combinedDice = [...oldDice, newDice[0]];
    let sortedDice = combinedDice.sort(function (die1, die2) {
      return die2.sides - die1.sides;
    });
    this.setState({
      mulDice: sortedDice,
      cash: this.state.cash - upgradeCost,
    });
  };
  handleAddDie = () => {
    const diceCost = (this.state.dice.length * 15) ** 2;
    if (this.state.cash < diceCost) {
      this.setState({
        show: true,
        difference: this.state.cash - diceCost,
      });
      this.handleAutoAlertClose();
      return;
    }
    if (this.state.dice.length >= 6) {
      this.setState({
        tooManySides: true,
      });
      this.handleAutoAlertClose();
      return;
    }
    this.setState({
      currentRolls: [...this.state.currentRolls, 1],
      dice: [...this.state.dice, { id: v4(), sides: 1 }],
      cash: this.state.cash - diceCost,
    });
  };
  handleAutoAlertClose = () => {
    if (this.state.alertTimeout) {
      return;
    }
    this.setState({
      alertTimeout: setTimeout(() => {
        this.setState({
          show: false,
          tooManySides: false,
          achieveAlert: false,
          alertTimeout: null,
        });
      }, 2900),
    });
  };

  handleDevMode = () => {
    this.setState({
      cash: Number.MAX_SAFE_INTEGER,
      dev: true,
    });
  };

  handleAchieveMode = () => {
    this.setState({
      achieveMode: !this.state.achieveMode,
    });
  };

  checkIfAchievementsComplete = () => {
    const achievementsData = detectAchievements(
      this.state.achievements,
      this.state.cash,
      this.state.dice,
      this.state.rollCount,
      this.state.combo,
      this.state.mulDice
    );
    if (achievementsData.wasSomethingCompleted) {
      this.setState({
        achieveAlert: true,
        lastAchievement: achievementsData.completedAchieve,
        achievements: achievementsData.sortedAchievements,
        achieveBonus:
          this.state.achieveBonus + achievementsData.completedAchieve.bonus,
      });
      this.handleAutoAlertClose();
    }
  };

  expandAchievePage = () => {
    const style = { height: 350 + "vh", width: 99 + "vw" };
    if (this.state.achieveMode) {
      return style;
    } else {
      return { height: 100 + "vh" };
    }
  };

  handleSaveMode = () => {
    this.handleEncodeSave();
    this.setState({
      saveMode: !this.state.saveMode,
    });
  };

  render() {
    return (
      <div className="gameContainer" style={this.expandAchievePage()}>
        <GameBar
          cash={this.state.cash}
          addDie={this.handleAddDie}
          diceAmount={this.state.dice.length}
          roll={this.handleRoll}
          combo={this.state.combo}
          lastRoll={this.state.lastRoll}
          addMulDie={this.handleAddMulDie}
          mulDiceAmount={this.state.mulDice.length}
          lastMulRoll={this.state.lastMulRoll}
          lastNaturalRoll={this.state.lastNaturalRoll}
          achieveMode={this.handleAchieveMode}
          achieveBonus={this.state.achieveBonus}
          saveMode={this.handleSaveMode}
        />
        {!this.state.achieveMode ? (
          <div className="playContainer">
            <DiceContainer
              dice={this.state.dice}
              upgradeDie={this.handleUpgradeDie}
              diceRolls={this.state.currentRolls}
              mulDice={this.state.mulDice}
              upgradeMulDie={this.handleUpgradeMulDie}
              currentMulRolls={this.state.currentMulRolls}
            />
          </div>
        ) : (
          <Achievements achievements={this.state.achievements} />
        )}
        {this.state.show ? (
          <NeedsCash difference={this.state.difference} />
        ) : null}
        {this.state.tooManySides ? (
          <TooManySides difference={this.state.difference} />
        ) : null}
        {!this.state.dev ? <DevHatch onClick={this.handleDevMode} /> : null}
        {this.state.achieveAlert ? (
          <AchieveAlert achievement={this.state.lastAchievement} />
        ) : null}
        {/* {this.state.saveMode ? (
          <SaveTab saveText={this.state.saveText} />
        ) : null} */}
      </div>
    );
  }
}

export default GameContainer;
