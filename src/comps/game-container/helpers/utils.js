export function calculateCombo(rollArr) {
  let combo = 1;
  let comboStr = null;
  switch (true) {
    case rollArr[0] === 6:
      comboStr = "Sextuple!!!! x60";
      combo = 60;
      break;
    case rollArr[0] === 5:
      comboStr = "Quintuple!!!! x25";
      combo = 25;
      break;
    case rollArr[0] >= 3 && rollArr[1] >= 2:
      comboStr = "Full House!!! x18";
      combo = 18;
      break;
    case rollArr[0] === 4:
      comboStr = "Quadruple!!! x12";
      combo = 12;
      break;
    case rollArr[0] === 3:
      comboStr = "Triple!! x6";
      combo = 6;
      break;
    case rollArr[0] === 2:
      comboStr = "Double! x2";
      combo = 2;
      break;
    default:
      comboStr = null;
  }
  return { comboStr, combo };
}

export function sortAchievements(achievements) {
  let sortedAchieves = achievements.sort(function (achieveA, achieveB) {
    return achieveA.achieveNo - achieveB.achieveNo;
  });
  return sortedAchieves;
}
