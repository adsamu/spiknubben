export function groupPlayersByTeam(players) {
  const teams = {};
  players.forEach((player) => {
    const { teamId } = player;
    if (!teams[teamId]) teams[teamId] = [];
    teams[teamId].push(player);
  });
  return teams;
}

