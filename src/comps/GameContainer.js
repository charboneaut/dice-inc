import "./GameContainer.css";
import { Component } from "react";
import GameBar from "./GameBar";
import DiceContainer from "./DiceContainer";
import Button from "react-bootstrap/Button";
import { v4 } from "uuid";
class GameContainer extends Component {
  state = {
    dice: [
      {
        id: v4(),
        sides: 6,
      },
    ],
    cash: 0,
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
  render() {
    return (
      <div className="gameContainer">
        <GameBar cash={this.state.cash} />
        <div className="playContainer">
          <DiceContainer dice={this.state.dice} />
          <Button onClick={this.handleRoll}>Roll!</Button>
        </div>
      </div>
    );
  }
}

export default GameContainer;
