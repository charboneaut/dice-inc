import { calculateCombo } from "./utils";

export default function helpRoll(dice, mulDice) {
  let rollsObj = {};
  let rollsArr = [];
  let rollTotal = 0;
  let naturalRoll = 0;
  let mulRollTotal = 0;
  let mulRollsArr = [];
  dice.forEach(function (die) {
    let roll = Math.floor(Math.random() * (die.sides - 1 + 1)) + 1;
    rollTotal += roll;
    rollsArr.push(roll);
  });
  naturalRoll = rollTotal;
  rollsArr.forEach(function (roll) {
    if (rollsObj[roll] === undefined) {
      rollsObj[roll] = 1;
    } else {
      rollsObj[roll]++;
    }
  });
  let comboData = calculateCombo(Object.values(rollsObj).sort((a, b) => b - a));
  if (mulDice.length > 0) {
    mulDice.forEach(function (die) {
      let roll = Math.floor(Math.random() * (die.sides - 1 + 1)) + 1;
      mulRollTotal += roll;
      mulRollsArr.push(roll);
    });
  } else {
    mulRollTotal = 1;
  }
  return {
    rollTotal,
    rollsArr,
    comboData,
    naturalRoll,
    mulRollTotal,
    mulRollsArr,
  };
}
