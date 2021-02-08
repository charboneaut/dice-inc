import { Component } from "react";
import { Card } from "react-bootstrap";
import "./Trophy.css";

class Trophy extends Component {
  render() {
    return (
      <Card
        className="trophyContainer"
        style={{ width: "18rem", margin: "1%", height: "18rem" }}
        bg="dark"
      >
        <Card.Header style={{ width: "18rem", fontWeight: "700" }}>
          {this.props.trophyName}
        </Card.Header>
        <Card.Body>
          <Card.Text className="desc">{this.props.trophyDesc}</Card.Text>
        </Card.Body>
        <Card.Text>{this.props.bonus}% Bonus</Card.Text>
        <Card.Text>{this.props.trophyDifficulty}</Card.Text>
        <Card.Footer style={{ width: "18rem", fontWeight: "700" }}>
          {this.props.completed ? "Completed" : "Incomplete"}
        </Card.Footer>
      </Card>
    );
  }
}

export default Trophy;
