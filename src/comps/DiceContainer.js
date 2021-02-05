import Button from "react-bootstrap/Button";
import { Component } from "react";
import "./DiceContainer.css";
import Die from "./Die";

class DiceContainer extends Component {
  render() {
    let index = -1;
    return (
      <div className="mainContainer">
        {this.props.dice.map((die) => {
          index++;
          return (
            <div key={die.id} className="die">
              <Die
                sides={die.sides}
                currentside={this.props.diceRolls[index]}
              />
              <p>D{die.sides}</p>
              <p>Upgrade at ${Math.round((die.sides * 1.6) ** 3)}</p>
              <Button
                onClick={() => this.props.handleUpgradeDice(die.id)}
                id="upgradeButton"
              >
                Upgrade
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DiceContainer;
