export function getChallengesDone(players) {
  if (!players || players.length === 0) return 0;

  const allRounds = Object.values(players[0].scores || {});
  const challengeCount = allRounds[0]?.length || 0;

  let totalCompleted = 0;

  for (let round = 1; round <= allRounds.length; round++) {
    for (let i = 0; i < challengeCount; i++) {
      const scores = players.map(
        player => player.scores?.[round]?.[i] ?? 0
      );
      const allDone = scores.every(score => score > 0);
      if (allDone) totalCompleted++;
    }
  }

  return totalCompleted;
}

export function groupPlayersByTeam(players) {
  const teams = {};
  players.forEach((player) => {
    const { teamId, teamName } = player;
    if (!teams[teamName]) teams[teamName] = [];
    teams[teamName].push(player);
  });
  return teams;
}

export function getTeamMates(player, players) {
  const teamMates = players .filter((p) => p.teamId === player.teamId && p.id !== player.id)
  return teamMates
}

export function getTeamById(TeamId, players) {
  const teamMates = players.filter((player) => {
    return player.teamId === TeamId;
  });
}

export function allTeamsFinishedRound(teams, round, challengesPerRound) {
  return Object.values(teams).every((players) => {
    const challengeCount = players[0]?.scores?.[round]?.length ?? 0;
    if (challengeCount < challengesPerRound) return false;

    for (let i = 0; i < challengesPerRound; i++) {
      const scores = players.map(p => p.scores?.[round]?.[i] ?? 0);
      if (!scores.every(score => score > 0)) {
        return false;
      }
    }

    return true;
  });
}

export function allTeamsFinishedAllRounds(teams, challengesPerRound) {
  return allTeamsFinishedRound(teams, 1, challengesPerRound)
    && allTeamsFinishedRound(teams, 2, challengesPerRound);
}

