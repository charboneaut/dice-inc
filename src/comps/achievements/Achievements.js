import { Component } from "react";
import { Col } from "react-bootstrap";
import Trophy from "../trophy/Trophy";
import "./Achievements.css";

class Achievements extends Component {
  render() {
    return (
      <>
        <div className="headerContainer">
          <h1>Achievements</h1>
          <Col className="achievementContainer">
            {this.props.achievements.map((achievement) => {
              return (
                <Trophy
                  key={achievement.id}
                  trophyName={achievement.title}
                  trophyDesc={achievement.desc}
                  completed={achievement.completed}
                  trophyDifficulty={achievement.difficulty}
                  bonus={achievement.bonus}
                />
              );
            })}
          </Col>
          <div className="note">
            <p>Achievements are only checked for completion upon roll</p>
            <p>
              Achievement bonuses are calculated last and rounded, a roll of 1
              with a 149% bonus is still 1
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Achievements;
