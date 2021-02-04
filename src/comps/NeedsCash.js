import { Component } from "react";
import { Alert } from "react-bootstrap";

class NeedsCash extends Component {
  render() {
    return (
      <Alert variant={"danger"} dismissible onClose={this.props.handleClose}>
        You need more cash
      </Alert>
    );
  }
}

export default NeedsCash;
