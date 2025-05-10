export function getTotalPoints(player, round = -1) {
  const scores = player.scores || {};

  if (round === 1 || round === 2) {
    return scores[round]?.reduce((sum, score) => sum + score, 0) || 0;
  }

  // Sum across all rounds
  return Object.values(scores)
    .flat()
    .reduce((sum, score) => sum + score, 0);
}

export function getSpikarCount(player, round = -1) {
  const scores = player.scores || {};

  const values =
    round === 1 || round === 2
      ? scores[round] || []
      : Object.values(scores).flat();

  return values.filter((score) => score === 1).length;
}

export function getChallengesDone(player, round = -1) {
  const scores = player.scores || {};

  const values =
    round === 1 || round === 2
      ? scores[round] || []
      : Object.values(scores).flat();

  return values.filter((score) => score !== 0).length;
}

