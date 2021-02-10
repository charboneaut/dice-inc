import { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./GameBar.css";
import { Button } from "react-bootstrap";

class GameBar extends Component {
  checkIfMul = () => {
    if (this.props.lastMulRoll) {
      return " x " + this.props.lastMulRoll;
    }
  };
  render() {
    let mulDiceStart = this.props.mulDiceAmount + 1;
    return (
      <Navbar variant="dark" expand="lg" id="gameBar">
        <Navbar.Brand>${this.props.cash}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Purchase Dice" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.props.addDie}>
                Purchase a standard die at ${(this.props.diceAmount * 15) ** 2}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.props.addMulDie}>
                Purchase a multiplier die at ${(mulDiceStart * 10) ** 3}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item
              onClick={this.props.achieveMode}
              className="achievementTab"
            >
              Achievements
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Nav.Item className="combo">
          <p>{this.props.combo}</p>
        </Nav.Item>
        <Nav.Item className="lastRoll">
          <p>Last Roll: {this.props.lastNaturalRoll}</p>
          <p className="gold">{this.checkIfMul()}</p>
          <p style={{ color: "lightgray" }}> x {this.props.achieveBonus}%</p>
          <p>, totaling {this.props.lastRoll}</p>
        </Nav.Item>
        <Button id="rollButton" onClick={this.props.roll}>
          Roll!
        </Button>
      </Navbar>
    );
  }
}

export default GameBar;
