import { Component } from "react";
import "./Trophy.css";

class Trophy extends Component {
  render() {
    return (
      <div className="trophyContainer">
        <h5>Achievement Title</h5>
        <p>Achievement Desc</p>
        <p>Achievement Difficulty</p>
        <p>COMPLETED</p>
      </div>
    );
  }
}

export default Trophy;
