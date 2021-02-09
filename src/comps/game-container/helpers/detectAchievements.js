import { sortAchievements } from "./utils";

export default function detectAchievements(
  achievements,
  cash,
  dice,
  rollCount
) {
  let wasSomethingCompleted = false;
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
  if (!achievements[3].completed && cash >= 1000) {
    achievements[3].completed = true;
    wasSomethingCompleted = true;
    return {
      sortedAchievements,
      completedAchieve: sortedAchievements[3],
      wasSomethingCompleted,
    };
  }
  if (!achievements[4].completed && dice.length > 1) {
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
  return { wasSomethingCompleted };
}
