import { Component } from "react";
import { Alert } from "react-bootstrap";
import "./AchieveAlert.css";
class AchieveAlert extends Component {
  render() {
    return (
      <Alert id="achieveAlert" variant="dark">
        Achievement Unlocked: {this.props.achievement.title}, +
        {this.props.achievement.bonus}%
      </Alert>
    );
  }
}

export default AchieveAlert;
