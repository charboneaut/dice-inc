import { Component } from "react";

class DiceContainer extends Component {
  render() {
    return (
      <div>
        {this.props.dice.map(function (die) {
          return <div>This is a d{die.sides}</div>;
        })}
      </div>
    );
  }
}

export default DiceContainer;
