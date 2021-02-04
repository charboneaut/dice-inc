import "./GameContainer.css";
import { Component } from "react";
import GameBar from "./GameBar";

class GameContainer extends Component {
  render() {
    return (
      <div className="gameContainer">
        <GameBar />
        This is the game container
      </div>
    );
  }
}

export default GameContainer;
