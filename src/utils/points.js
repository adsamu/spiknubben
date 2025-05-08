export function getTotalPoints(player) {
  return player.scores?.reduce((sum, score) => sum + score, 0) || 0;
}

export function getSpikarCount(player) {
  return player.scores?.filter((score) => score === 1).length || 0;
}
