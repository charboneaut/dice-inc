import { Component } from "react";
import { Alert } from "react-bootstrap";
import "./NeedsCash.css";
class NeedsCash extends Component {
  render() {
    return (
      <Alert id="cashAlert" variant={"danger"}>
        You need ${-this.props.difference} more.
      </Alert>
    );
  }
}

export default NeedsCash;
