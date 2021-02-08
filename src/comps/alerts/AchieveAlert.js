import { Component } from "react";
import { Alert } from "react-bootstrap";
import "./AchieveAlert.css";
class AchieveAlert extends Component {
  render() {
    return (
      <Alert id="achieveAlert" variant="light">
        u did it
      </Alert>
    );
  }
}

export default AchieveAlert;
