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
        sides: 1,
      },
    ],
    cash: 0,
    show: false,
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
    if (this.state.cash < newDice[0].sides * 1.6) {
      this.setState({
        show: true,
      });
      return;
    }
    let oldDice = this.state.dice.filter(function (die) {
      return die.id !== upgradedId;
    });
    let oldSides = newDice[0].sides;
    newDice[0].sides++;
    let combinedDice = [...oldDice, newDice[0]];
    let sortedDice = combinedDice.sort(function (die1, die2) {
      return die2.sides - die1.sides;
    });
    this.setState({
      dice: sortedDice,
      cash: this.state.cash - oldSides * 1.6,
    });
  };
  handleAlertClose = () => {
    this.setState({
      show: false,
    });
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
            <NeedsCash handleClose={this.handleAlertClose} />
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
