import { Component } from "react";
import { Alert } from "react-bootstrap";
import "./NeedsCash.css";
class TooManySides extends Component {
  render() {
    return (
      <Alert id="cashAlert" variant="info">
        sorry bud, thems the brakes
      </Alert>
    );
  }
}

export default TooManySides;
