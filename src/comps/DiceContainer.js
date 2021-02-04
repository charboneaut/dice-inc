import Button from "react-bootstrap/Button";
import { Component } from "react";

class DiceContainer extends Component {
  render() {
    return (
      <div>
        {this.props.dice.map((die) => {
          return (
            <div key={die.id}>
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
