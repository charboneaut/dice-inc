import "./GameContainer.css";
import { Component } from "react";
import GameBar from "../game-bar/GameBar";
import DiceContainer from "../dice-container/DiceContainer";
import { v4 } from "uuid";
import NeedsCash from "../alerts/NeedsCash";
import TooManySides from "../alerts/TooManySides";
import DevHatch from "../dev-hatch/DevHatch";
import helpRoll from "./helpers/helpRoll";
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
  };
  handleAddMulDice = () => {
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
    });
  };
  handleRoll = () => {
    const rollData = helpRoll(this.state.dice, this.state.mulDice);
    this.setState({
      lastNaturalRoll: rollData.naturalRoll,
      currentRolls: rollData.rollsArr,
      cash: this.state.cash + rollData.rollTotal,
      lastRoll:
        rollData.rollTotal * rollData.mulRollTotal * rollData.comboData.combo,
      lastMulRoll: rollData.mulRollTotal,
      currentMulRolls: rollData.mulRollsArr,
      combo: rollData.comboData.comboStr,
    });
  };
  handleUpgradeDice = (upgradedId) => {
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
    if (newDice[0].sides >= 6) {
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
  handleUpgradeMulDice = (upgradedId) => {
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
    if (newDice[0].sides >= 6) {
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
  handleAddDice = () => {
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
          alertTimeout: null,
        });
      }, 2900),
    });
  };

  handleCheatMode = () => {
    this.setState({
      cash: Number.MAX_SAFE_INTEGER,
      dev: true,
    });
  };

  render() {
    if (this.state.show) {
      return (
        <div className="gameContainer">
          <GameBar
            cash={this.state.cash}
            handleAddDice={this.handleAddDice}
            diceAmount={this.state.dice.length}
            handleRoll={this.handleRoll}
            combo={this.state.combo}
            lastRoll={this.state.lastRoll}
            handleAddMulDice={this.handleAddMulDice}
            mulDiceAmount={this.state.mulDice.length}
            lastMulRoll={this.state.lastMulRoll}
            lastNaturalRoll={this.state.lastNaturalRoll}
          />
          <div className="playContainer">
            <DiceContainer
              dice={this.state.dice}
              handleUpgradeDice={this.handleUpgradeDice}
              diceRolls={this.state.currentRolls}
              mulDice={this.state.mulDice}
              handleUpgradeMulDice={this.handleUpgradeMulDice}
              currentMulRolls={this.state.currentMulRolls}
            />
            <NeedsCash difference={this.state.difference} />
          </div>
        </div>
      );
    }
    if (this.state.tooManySides) {
      return (
        <div className="gameContainer">
          <GameBar
            cash={this.state.cash}
            handleAddDice={this.handleAddDice}
            diceAmount={this.state.dice.length}
            handleRoll={this.handleRoll}
            combo={this.state.combo}
            lastRoll={this.state.lastRoll}
            handleAddMulDice={this.handleAddMulDice}
            mulDiceAmount={this.state.mulDice.length}
            lastMulRoll={this.state.lastMulRoll}
            lastNaturalRoll={this.state.lastNaturalRoll}
          />
          <div className="playContainer">
            <DiceContainer
              dice={this.state.dice}
              handleUpgradeDice={this.handleUpgradeDice}
              diceRolls={this.state.currentRolls}
              mulDice={this.state.mulDice}
              handleUpgradeMulDice={this.handleUpgradeMulDice}
              currentMulRolls={this.state.currentMulRolls}
            />
            <TooManySides difference={this.state.difference} />
          </div>
        </div>
      );
    }
    if (this.state.dev) {
      return (
        <div className="gameContainer">
          <GameBar
            cash={this.state.cash}
            handleAddDice={this.handleAddDice}
            diceAmount={this.state.dice.length}
            handleRoll={this.handleRoll}
            combo={this.state.combo}
            lastRoll={this.state.lastRoll}
            handleAddMulDice={this.handleAddMulDice}
            mulDiceAmount={this.state.mulDice.length}
            lastMulRoll={this.state.lastMulRoll}
            lastNaturalRoll={this.state.lastNaturalRoll}
          />
          <div className="playContainer">
            <DiceContainer
              dice={this.state.dice}
              handleUpgradeDice={this.handleUpgradeDice}
              diceRolls={this.state.currentRolls}
              mulDice={this.state.mulDice}
              handleUpgradeMulDice={this.handleUpgradeMulDice}
              currentMulRolls={this.state.currentMulRolls}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="gameContainer">
        <GameBar
          cash={this.state.cash}
          handleAddDice={this.handleAddDice}
          diceAmount={this.state.dice.length}
          handleRoll={this.handleRoll}
          combo={this.state.combo}
          lastRoll={this.state.lastRoll}
          handleAddMulDice={this.handleAddMulDice}
          mulDiceAmount={this.state.mulDice.length}
          lastMulRoll={this.state.lastMulRoll}
          lastNaturalRoll={this.state.lastNaturalRoll}
        />
        <div className="playContainer">
          <DiceContainer
            dice={this.state.dice}
            handleUpgradeDice={this.handleUpgradeDice}
            diceRolls={this.state.currentRolls}
            mulDice={this.state.mulDice}
            handleUpgradeMulDice={this.handleUpgradeMulDice}
            currentMulRolls={this.state.currentMulRolls}
          />
        </div>
        <DevHatch onClick={this.handleCheatMode} />
      </div>
    );
  }
}

export default GameContainer;
