import { Component } from "react";
import Trophy from "../trophy/Trophy";
import "./Achievements.css";

class Achievements extends Component {
  render() {
    return (
      <div className="headerContainer">
        <h1>Achievements</h1>
        <Trophy />
      </div>
    );
  }
}

export default Achievements;
