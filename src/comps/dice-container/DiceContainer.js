import Button from "react-bootstrap/Button";
import { Component } from "react";
import "./DiceContainer.css";
import Die from "../die/Die";

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
              <p>Upgrade at ${Math.round((die.sides * 3) ** 2)}</p>
              <Button
                onClick={() => this.props.upgradeDie(die.id)}
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
              <p>Upgrade at ${Math.round((mulDie.sides * 20) ** 2)}</p>
              <Button
                onClick={() => this.props.upgradeMulDie(mulDie.id)}
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
