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
    achievements: [
      {
        id: v4(),
        difficulty: "Very Easy",
        bonus: 1,
        title: "Roll your first die",
        desc: "Just press the button",
        completed: false,
        achieveNo: 1,
      },
      {
        id: v4(),
        difficulty: "Very Easy",
        bonus: 1,
        title: "Upgrade your first die",
        desc: "I wonder what this button does",
        completed: false,
        achieveNo: 2,
      },
      {
        id: v4(),
        difficulty: "Very Easy",
        bonus: 1,
        title: "Posess a whole Benjamin",
        desc: "High schoolers are jealous of you",
        completed: false,
        achieveNo: 3,
      },
      {
        id: v4(),
        difficulty: "Very Easy",
        bonus: 1,
        title: "Add your first dice",
        desc: "Double down",
        completed: false,
        achieveNo: 4,
      },
      {
        id: v4(),
        difficulty: "Easy",
        bonus: 3,
        title: "Posess $1000",
        desc: "Still less than the stimulus check",
        completed: false,
        achieveNo: 5,
      },
      {
        id: v4(),
        difficulty: "Easy",
        bonus: 3,
        title: "Roll 100x",
        desc: "Just press the button 100 times",
        completed: false,
        achieveNo: 6,
      },
      {
        id: v4(),
        difficulty: "Easy",
        bonus: 3,
        title: "Upgrade a die to a d6",
        desc: "The classic",
        completed: false,
        achieveNo: 7,
      },
      {
        id: v4(),
        difficulty: "Easy",
        bonus: 3,
        title: "Roll your first double",
        desc: "Snake eyes?",
        completed: false,
        achieveNo: 8,
      },
      {
        id: v4(),
        difficulty: "Medium",
        bonus: 5,
        title: "Posess $10000",
        desc: "Almost minimum wage",
        completed: false,
        achieveNo: 9,
      },
      {
        id: v4(),
        difficulty: "Medium",
        bonus: 5,
        title: "Roll 1000x",
        desc: "Just press the button 1000 times",
        completed: false,
        achieveNo: 10,
      },
      {
        id: v4(),
        difficulty: "Medium",
        bonus: 5,
        title: "Roll your first triple",
        desc: "OH BABY A TRIPLE",
        completed: false,
        achieveNo: 11,
      },
      {
        id: v4(),
        difficulty: "Medium",
        bonus: 5,
        title: "Add your first multiplier die",
        desc: "It's a slippery slope from here",
        completed: false,
        achieveNo: 12,
      },
      {
        id: v4(),
        difficulty: "Hard",
        bonus: 8,
        title: "Roll your first quadruple",
        desc: "Most people can only tuple this high",
        completed: false,
        achieveNo: 13,
      },
      {
        id: v4(),
        difficulty: "Hard",
        bonus: 8,
        title: "Upgrade a die to a d12",
        desc: "Dodecahedron",
        completed: false,
        achieveNo: 14,
      },
      {
        id: v4(),
        difficulty: "Hard",
        bonus: 8,
        title: "Have 6 dice total",
        desc: "Land Grab",
        completed: false,
        achieveNo: 15,
      },
      {
        id: v4(),
        difficulty: "Hard",
        bonus: 8,
        title: "Posess $100000",
        desc: "Big Spender",
        completed: false,
        achieveNo: 16,
      },
    ],
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
    let upgradeCost = Math.round((newDice[0].sides * 1.6) ** 3);
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
    let upgradeCost = Math.round((newDice[0].sides * 10) ** 3);
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
    const diceCost = (this.state.dice.length * 6) ** 3;
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
    const style = { height: 200 + "vh", width: 99 + "vw" };
    if (this.state.achieveMode) {
      return style;
    } else {
      return { height: 100 + "vh" };
    }
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
      </div>
    );
  }
}

export default GameContainer;
