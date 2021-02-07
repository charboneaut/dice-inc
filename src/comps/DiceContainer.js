import Button from "react-bootstrap/Button";
import { Component } from "react";
import "./DiceContainer.css";
import Die from "./Die";

class DiceContainer extends Component {
  render() {
    let indexD = -1;
    let indexM = -1;
    return (
      <div className="mainContainer">
        {this.props.dice.map((die) => {
          indexD++;
          return (
            <div key={die.id} className="die">
              <Die
                sides={die.sides}
                currentside={this.props.diceRolls[indexD]}
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
        {this.props.mulDice.map((mulDie) => {
          indexM++;
          return (
            <div key={mulDie.id} className="mulDie">
              <Die
                sides={mulDie.sides}
                currentside={this.props.currentMulRolls[indexM]}
              />
              <p>D{mulDie.sides}</p>
              <p>Upgrade at ${Math.round((mulDie.sides * 10) ** 3)}</p>
              <Button
                onClick={() => this.props.handleUpgradeMulDice(mulDie.id)}
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
