import "./GameContainer.css";
import { Component } from "react";
import GameBar from "./GameBar";
import DiceContainer from "./DiceContainer";
import Button from "react-bootstrap/Button";

class GameContainer extends Component {
  state = {
    cash: 0,
  };
  handleRoll = () => {
    this.setState({
      cash: this.state.cash + 1,
    });
  };
  render() {
    return (
      <div className="gameContainer">
        <GameBar cash={this.state.cash} />
        <div className="playContainer">
          <DiceContainer />
          <Button onClick={this.handleRoll}>Roll!</Button>
        </div>
      </div>
    );
  }
}

export default GameContainer;
