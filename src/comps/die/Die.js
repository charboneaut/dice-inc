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
      case 7:
        return (
          <div className="seven">
            <div>O O O</div>
            <div>O</div>
            <div>O O O</div>
          </div>
        );
      case 8:
        return (
          <div className="eight">
            <div>O O O O</div>
            <div>O O O O</div>
          </div>
        );
      case 9:
        return (
          <div className="seven">
            <div>O O O</div>
            <div>O O O</div>
            <div>O O O</div>
          </div>
        );
      case 10:
        return (
          <div className="ten">
            <div>O O O O O</div>
            <div>O O O O O</div>
          </div>
        );
      case 11:
        return (
          <div className="ten">
            <div>O O O O O O</div>
            <div>O O O O O</div>
          </div>
        );
      case 12:
        return (
          <div className="ten">
            <div>O O O O O O</div>
            <div>O O O O O O</div>
          </div>
        );
      case 13:
        return (
          <div className="thirteen">
            <div>O O O O</div>
            <div>O O O O O</div>
            <div>O O O O</div>
          </div>
        );
      case 14:
        return (
          <div className="thirteen">
            <div>O O O O O</div>
            <div>O O O O</div>
            <div>O O O O O</div>
          </div>
        );
      case 15:
        return (
          <div className="thirteen">
            <div>O O O O O</div>
            <div>O O O O O</div>
            <div>O O O O O</div>
          </div>
        );
      case 16:
        return (
          <div className="sixteen">
            <div>O O O O</div>
            <div>O O O O</div>
            <div>O O O O</div>
            <div>O O O O</div>
          </div>
        );
      case 17:
        return (
          <div className="sixteen">
            <div>O O O O</div>
            <div>O O O O O</div>
            <div>O O O O</div>
            <div>O O O O</div>
          </div>
        );
      case 18:
        return (
          <div className="sixteen">
            <div>O O O O</div>
            <div>O O O O O</div>
            <div>O O O O O</div>
            <div>O O O O</div>
          </div>
        );
      case 19:
        return (
          <div className="sixteen">
            <div>O O O O O</div>
            <div>O O O O O</div>
            <div>O O O O O</div>
            <div>O O O O</div>
          </div>
        );
      case 20:
        return (
          <div className="sixteen">
            <div>O O O O O</div>
            <div>O O O O O</div>
            <div>O O O O O</div>
            <div>O O O O O</div>
          </div>
        );
      default:
        return `d${this.props.sides}`;
    }
  };
  render() {
    return <div className="indvDie">{this.createDie()}</div>;
  }
}

export default Die;
