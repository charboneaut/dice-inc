import { sortAchievements } from "./utils";

export default function detectAchievements(achievements) {
  let wasSomethingCompleted = false;
  if (!achievements[0].completed) {
    achievements[0].completed = true;
    wasSomethingCompleted = true;
  }
  const sortedAchievements = sortAchievements(achievements);
  return {
    sortedAchievements,
    completedAchieve: sortedAchievements[0],
    wasSomethingCompleted,
  };
}
