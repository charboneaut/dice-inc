import Button from "react-bootstrap/Button";
import { Component } from "react";
import "./DiceContainer.css";

class DiceContainer extends Component {
  render() {
    return (
      <div className="mainContainer">
        {this.props.dice.map((die) => {
          return (
            <div key={die.id} className="die">
              This is a d{die.sides}
              <Button onClick={() => this.props.handleUpgradeDice(die.id)}>
                Upgrade!
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DiceContainer;
