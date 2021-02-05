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
                Purchase a die at ${(this.props.diceAmount * 10) ** 3}
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button id="rollButton" onClick={this.props.handleRoll}>
          Roll!
        </Button>
      </Navbar>
    );
  }
}

export default GameBar;
