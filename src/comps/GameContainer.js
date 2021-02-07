import "./GameContainer.css";
import { Component } from "react";
import GameBar from "./GameBar";
import DiceContainer from "./DiceContainer";
import { v4 } from "uuid";
import NeedsCash from "./NeedsCash";
import TooManySides from "./TooManySides";
import DevHatch from "./DevHatch";
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
    let rollTotal = 0;
    let mulRollTotal = 0;
    let rolls = [];
    let mulRolls = [];
    this.state.dice.map(function (die) {
      let roll = Math.floor(Math.random() * (die.sides - 1 + 1)) + 1;
      rollTotal += roll;
      rolls.push(roll);
      return null;
    });
    let rollsObj = {};
    rolls.map(function (roll) {
      if (rollsObj[roll] === undefined) {
        rollsObj[roll] = 1;
      } else {
        rollsObj[roll]++;
      }
      return null;
    });
    let sortedRolls = Object.values(rollsObj).sort((a, b) => {
      return b - a;
    });
    if (sortedRolls[0] === 5) {
      this.setState({
        combo: "Quintuple!!!! x25",
      });
      rollTotal = rollTotal * 25;
    } else if (sortedRolls[0] >= 3 && sortedRolls[1] >= 2) {
      this.setState({
        combo: "Full House!!! x18",
      });
      rollTotal = rollTotal * 18;
    } else if (sortedRolls[0] === 4) {
      this.setState({
        combo: "Quadruple!!! x12",
      });
      rollTotal = rollTotal * 16;
    } else if (sortedRolls[0] === 3) {
      this.setState({
        combo: "Triple!! x6",
      });
      rollTotal = rollTotal * 6;
    } else if (sortedRolls[0] === 2) {
      this.setState({
        combo: "Double! x2",
      });
      rollTotal = rollTotal * 2;
    } else {
      this.setState({
        combo: null,
      });
    }
    if (this.state.mulDice.length > 0) {
      this.state.mulDice.map(function (die) {
        let roll = Math.floor(Math.random() * (die.sides - 1 + 1)) + 1;
        mulRollTotal += roll;
        mulRolls.push(roll);
        return null;
      });
      let rollsMulObj = {};
      mulRolls.map(function (roll) {
        if (rollsMulObj[roll] === undefined) {
          rollsMulObj[roll] = 1;
        } else {
          rollsMulObj[roll]++;
        }
        return null;
      });
      let sortedRolls = Object.values(rollsObj).sort((a, b) => {
        return b - a;
      });
      if (sortedRolls[0] === 5) {
        this.setState({
          mulCombo: "Quintuple!!!! x25",
        });
        mulRollTotal = mulRollTotal * 25;
      } else if (sortedRolls[0] >= 3 && sortedRolls[1] >= 2) {
        this.setState({
          mulCombo: "Full House!!! x18",
        });
        mulRollTotal = mulRollTotal * 18;
      } else if (sortedRolls[0] === 4) {
        this.setState({
          mulCombo: "Quadruple!!! x12",
        });
        mulRollTotal = mulRollTotal * 16;
      } else if (sortedRolls[0] === 3) {
        this.setState({
          mulCombo: "Triple!! x6",
        });
        mulRollTotal = mulRollTotal * 6;
      } else if (sortedRolls[0] === 2) {
        this.setState({
          mulCombo: "Double! x2",
        });
        mulRollTotal = mulRollTotal * 2;
      } else {
        this.setState({
          mulCombo: null,
        });
      }
      rollTotal = rollTotal * mulRollTotal;
      this.setState({
        lastMulRoll: mulRollTotal,
        currentMulRolls: mulRolls,
      });
    }
    this.setState({
      currentRolls: rolls,
      cash: this.state.cash + rollTotal,
      lastRoll: rollTotal,
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
