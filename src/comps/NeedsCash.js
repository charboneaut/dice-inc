import { Component } from "react";
import { Alert } from "react-bootstrap";
import "./NeedsCash.css";
class NeedsCash extends Component {
  render() {
    return (
      <Alert
        id="cashAlert"
        variant={"danger"}
        dismissible
        onClose={this.props.handleClose}
      >
        You need more cash
      </Alert>
    );
  }
}

export default NeedsCash;
