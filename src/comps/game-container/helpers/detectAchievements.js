import { sortAchievements } from "./utils";

export default function detectAchievements(
  achievements,
  cash,
  dice,
  rollCount,
  combo,
  mulDice
) {
  let wasSomethingCompleted = false;
  combo = combo === null ? "single" : combo;
  const sortedAchievements = sortAchievements(achievements);
  if (!achievements[0].completed) {
    achievements[0].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[0],
      wasSomethingCompleted,
    };
  }
  if (!achievements[1].completed && dice[0].sides > 1) {
    achievements[1].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[1],
      wasSomethingCompleted,
    };
  }
  if (!achievements[2].completed && cash >= 100) {
    achievements[2].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[2],
      wasSomethingCompleted,
    };
  }
  if (!achievements[3].completed && dice.length > 1) {
    achievements[3].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[3],
      wasSomethingCompleted,
    };
  }
  if (!achievements[4].completed && cash >= 1000) {
    achievements[4].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[4],
      wasSomethingCompleted,
    };
  }
  if (!achievements[5].completed && rollCount >= 99) {
    achievements[5].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[5],
      wasSomethingCompleted,
    };
  }
  if (!achievements[6].completed && dice[0].sides >= 6) {
    achievements[6].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[6],
      wasSomethingCompleted,
    };
  }
  if (!achievements[7].completed && combo.startsWith("Double")) {
    achievements[7].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[7],
      wasSomethingCompleted,
    };
  }
  if (!achievements[8].completed && cash >= 10000) {
    achievements[8].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[8],
      wasSomethingCompleted,
    };
  }
  if (!achievements[9].completed && rollCount >= 999) {
    achievements[9].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[9],
      wasSomethingCompleted,
    };
  }
  if (!achievements[10].completed && combo.startsWith("Triple")) {
    achievements[10].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[10],
      wasSomethingCompleted,
    };
  }
  if (!achievements[11].completed && mulDice.length > 0) {
    achievements[11].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[11],
      wasSomethingCompleted,
    };
  }
  if (!achievements[12].completed && combo.startsWith("Quadruple")) {
    achievements[12].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[12],
      wasSomethingCompleted,
    };
  }
  if (!achievements[13].completed && dice[0].sides >= 12) {
    achievements[13].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[13],
      wasSomethingCompleted,
    };
  }
  if (!achievements[14].completed && dice.length + mulDice.length >= 6) {
    achievements[14].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[14],
      wasSomethingCompleted,
    };
  }
  if (!achievements[15].completed && cash >= 100000) {
    achievements[15].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[15],
      wasSomethingCompleted,
    };
  }
  if (!achievements[16].completed && dice[0].sides === 20) {
    achievements[16].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[16],
      wasSomethingCompleted,
    };
  }
  if (!achievements[17].completed && cash >= 10000000) {
    achievements[17].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[17],
      wasSomethingCompleted,
    };
  }
  if (!achievements[18].completed && dice.length + mulDice.length === 12) {
    achievements[18].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[18],
      wasSomethingCompleted,
    };
  }
  if (!achievements[19].completed && combo.startsWith("Quintuple")) {
    achievements[19].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[19],
      wasSomethingCompleted,
    };
  }
  return { wasSomethingCompleted };
}
