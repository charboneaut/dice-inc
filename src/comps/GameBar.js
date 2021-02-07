import { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./GameBar.css";
import { Button } from "react-bootstrap";

class GameBar extends Component {
  render() {
    return (
      <Navbar variant="dark" expand="lg" id="gameBar">
        <Navbar.Brand>${this.props.cash}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Purchase Dice" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.props.handleAddDice}>
                Purchase a standard die at ${(this.props.diceAmount * 6) ** 3}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.props.handleAddMulDice}>
                Purchase a multiplier die at ${(this.props.diceAmount * 6) ** 3}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav.Item className="combo">
          <p>{this.props.combo}</p>
        </Nav.Item>
        <Nav.Item className="lastRoll">
          <p>Last Roll: {this.props.lastRoll}</p>
        </Nav.Item>
        <Button id="rollButton" onClick={this.props.handleRoll}>
          Roll!
        </Button>
      </Navbar>
    );
  }
}

export default GameBar;
