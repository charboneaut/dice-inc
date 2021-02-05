import { Component } from "react";
import "./Die.css";

class Die extends Component {
  createDie = () => {
    switch (this.props.currentside) {
      case 1:
        return "O";
      case 2:
        return (
          <>
            <div>O⠀⠀⠀</div>
            <div>⠀⠀⠀O</div>
          </>
        );
      case 3:
        return `O O O`;
      case 4:
        return (
          <div className="four">
            <div>O ⠀O</div>
            <div>O ⠀O</div>
          </div>
        );
      case 5:
        return (
          <div className="five">
            <div>O ⠀O</div>
            <div>O</div>
            <div>O ⠀O</div>
          </div>
        );
      case 6:
        return (
          <>
            <div>O O O</div>
            <div>O O O</div>
          </>
        );
      default:
        return `d${this.props.sides}`;
    }
  };
  //TODO LIMIT TO 20 SIDES
  render() {
    return <div className="indvDie">{this.createDie()}</div>;
  }
}

export default Die;
