import {
  groupPlayersByTeam,
  getTeamMates,
  getTeamById,
  allTeamsFinishedRound,
  allTeamsFinishedAllRounds,
  getChallengesDone,
} from './teamHelpers';

const makePlayer = (id, teamId, teamName, r1, r2) => ({
  id,
  teamId,
  teamName,
  scores: { 1: r1, 2: r2 },
});

const anna = makePlayer('anna', 'T1', 'Sälarna', [1, 2, 3], [0, 0, 0]);
const erik = makePlayer('erik', 'T1', 'Sälarna', [2, 1, 0], [0, 0, 0]);
const sofia = makePlayer('sofia', 'T2', 'Hajarna', [3, 0, 1], [0, 0, 0]);

describe('groupPlayersByTeam', () => {
  it('groups players by teamId', () => {
    const groups = groupPlayersByTeam([anna, erik, sofia]);
    expect(Object.keys(groups)).toHaveLength(2);
    expect(groups['T1']).toHaveLength(2);
    expect(groups['T2']).toHaveLength(1);
  });

  it('returns empty object for empty array', () => {
    expect(groupPlayersByTeam([])).toEqual({});
  });
});

describe('getTeamMates', () => {
  it('returns teammates excluding the player themselves', () => {
    const mates = getTeamMates(anna, [anna, erik, sofia]);
    expect(mates).toHaveLength(1);
    expect(mates[0].id).toBe('erik');
  });

  it('returns empty array when player is alone on their team', () => {
    expect(getTeamMates(sofia, [anna, erik, sofia])).toHaveLength(0);
  });
});

describe('getTeamById', () => {
  it('BUG: returns undefined due to missing return statement', () => {
    // This documents a known bug in teamHelpers.js line 37-41.
    // getTeamById filters players but never returns the result.
    const result = getTeamById('T1', [anna, erik, sofia]);
    expect(result).toBeUndefined();
  });
});

describe('allTeamsFinishedRound', () => {
  it('returns true when all players have non-zero scores for every challenge', () => {
    const done = makePlayer('p', 'T1', 'A', [1, 2, 3], [0, 0, 0]);
    const teams = { T1: [done] };
    expect(allTeamsFinishedRound(teams, 1, 3)).toBe(true);
  });

  it('returns false when any challenge has a zero score', () => {
    const partial = makePlayer('p', 'T1', 'A', [1, 0, 3], [0, 0, 0]);
    const teams = { T1: [partial] };
    expect(allTeamsFinishedRound(teams, 1, 3)).toBe(false);
  });

  it('returns false when a team has fewer challenges than required', () => {
    const short = makePlayer('p', 'T1', 'A', [1, 2], [0, 0]);
    const teams = { T1: [short] };
    expect(allTeamsFinishedRound(teams, 1, 3)).toBe(false);
  });

  it('handles multiple teams — returns false if any team is incomplete', () => {
    const done = makePlayer('p1', 'T1', 'A', [1, 2, 3], [0, 0, 0]);
    const notDone = makePlayer('p2', 'T2', 'B', [1, 0, 3], [0, 0, 0]);
    const teams = groupPlayersByTeam([done, notDone]);
    expect(allTeamsFinishedRound(teams, 1, 3)).toBe(false);
  });
});

describe('allTeamsFinishedAllRounds', () => {
  it('returns true only when both rounds are complete', () => {
    const p = makePlayer('p', 'T1', 'A', [1, 2], [3, 1]);
    const teams = { T1: [p] };
    expect(allTeamsFinishedAllRounds(teams, 2)).toBe(true);
  });

  it('returns false when round 2 is incomplete', () => {
    const p = makePlayer('p', 'T1', 'A', [1, 2], [0, 1]);
    const teams = { T1: [p] };
    expect(allTeamsFinishedAllRounds(teams, 2)).toBe(false);
  });
});

describe('getChallengesDone (team version)', () => {
  it('counts challenges where every player has a non-zero score', () => {
    const p1 = makePlayer('p1', 'T1', 'A', [1, 0, 2], [0, 0, 0]);
    const p2 = makePlayer('p2', 'T1', 'A', [2, 0, 1], [0, 0, 0]);
    // Challenge 0: both done, challenge 1: neither done, challenge 2: both done
    // That's 2 done per round, 4 total across rounds 1 and 2 (round 2 all zero = 0 done)
    expect(getChallengesDone([p1, p2])).toBe(2);
  });

  it('returns 0 for empty player array', () => {
    expect(getChallengesDone([])).toBe(0);
  });

  it('returns 0 when no challenge has all players scoring', () => {
    const p1 = makePlayer('p1', 'T1', 'A', [1, 0, 0], [0, 0, 0]);
    const p2 = makePlayer('p2', 'T1', 'A', [0, 1, 0], [0, 0, 0]);
    expect(getChallengesDone([p1, p2])).toBe(0);
  });
});
