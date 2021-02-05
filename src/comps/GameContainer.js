import "./GameContainer.css";
import { Component } from "react";
import GameBar from "./GameBar";
import DiceContainer from "./DiceContainer";
import Button from "react-bootstrap/Button";
import { v4 } from "uuid";
import NeedsCash from "./NeedsCash";
class GameContainer extends Component {
  state = {
    dice: [
      {
        id: v4(),
        sides: 5,
      },
    ],
    cash: 0,
    show: false,
    difference: 0,
  };
  handleRoll = () => {
    let rollTotal = 0;
    this.state.dice.map(function (die) {
      rollTotal += Math.floor(Math.random() * (die.sides - 1 + 1)) + 1;
      return null;
    });
    this.setState({
      cash: this.state.cash + rollTotal,
    });
  };
  handleUpgradeDice = (upgradedId) => {
    let newDice = this.state.dice.filter(function (die) {
      return die.id === upgradedId;
    });
    let upgradeCost = Math.round(newDice[0].sides * 1.6);
    if (this.state.cash < upgradeCost) {
      this.setState({
        show: true,
        difference: this.state.cash - upgradeCost,
      });
      this.handleAutoAlertClose();
      return;
    }
    if (newDice[0].sides >= 6) {
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
  handleAutoAlertClose = () => {
    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 2900);
  };

  render() {
    if (this.state.show) {
      return (
        <div className="gameContainer">
          <GameBar cash={this.state.cash} />
          <div className="playContainer">
            <DiceContainer
              dice={this.state.dice}
              handleUpgradeDice={this.handleUpgradeDice}
            />
            <Button onClick={this.handleRoll}>Roll!</Button>
            <NeedsCash difference={this.state.difference} />
          </div>
        </div>
      );
    }
    return (
      <div className="gameContainer">
        <GameBar cash={this.state.cash} />
        <div className="playContainer">
          <DiceContainer
            dice={this.state.dice}
            handleUpgradeDice={this.handleUpgradeDice}
          />
          <Button onClick={this.handleRoll}>Roll!</Button>
        </div>
      </div>
    );
  }
}

export default GameContainer;
