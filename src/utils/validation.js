export function validatePlayersForm(teamName, members, existingPlayers=[]) {
  const trimmedNames = members.map((m) => m.name.trim());
  const seen = new Set();

  if (existingPlayers.length > 0) {
    existingPlayers.forEach((player) => {
      seen.add(player.name.trim());
    });
  }

  const hasAtLeastOneValidName = trimmedNames.some((name) => name !== "");

  const duplicateNames = trimmedNames.some((name) => {
    if (!name) return false;
    if (seen.has(name)) return true;
    seen.add(name);
    return false;
  });

  const hasTooLongNames = trimmedNames.some((name) => name.length > 10);
  const teamNameIsEmpty = !teamName.trim();

  const isFormValid =
    !teamNameIsEmpty &&
    hasAtLeastOneValidName &&
    !hasTooLongNames &&
    !duplicateNames;

  return {
    isFormValid,
    teamNameIsEmpty,
    hasAtLeastOneValidName,
    duplicateNames,
    hasTooLongNames,
  };
}

