import { getTotalPoints, getSpikarCount, getChallengesDone } from './pointHelpers';

const makePlayer = (r1, r2) => ({ scores: { 1: r1, 2: r2 } });

describe('getTotalPoints', () => {
  it('returns 0 for all-zero scores', () => {
    const p = makePlayer([0, 0, 0], [0, 0, 0]);
    expect(getTotalPoints(p)).toBe(0);
  });

  it('sums across both rounds when no round arg', () => {
    const p = makePlayer([1, 2, 3], [1, 0, 2]);
    expect(getTotalPoints(p)).toBe(9);
  });

  it('sums only round 1 when round=1', () => {
    const p = makePlayer([1, 2, 3], [1, 1, 1]);
    expect(getTotalPoints(p, 1)).toBe(6);
  });

  it('sums only round 2 when round=2', () => {
    const p = makePlayer([1, 2, 3], [2, 0, 1]);
    expect(getTotalPoints(p, 2)).toBe(3);
  });

  it('returns 0 for player with no scores', () => {
    expect(getTotalPoints({})).toBe(0);
  });
});

describe('getSpikarCount', () => {
  it('returns 0 when no scores equal 1', () => {
    const p = makePlayer([2, 3, 0], [2, 2, 3]);
    expect(getSpikarCount(p)).toBe(0);
  });

  it('only counts entries exactly equal to 1', () => {
    const p = makePlayer([1, 2, 1], [3, 1, 0]);
    expect(getSpikarCount(p)).toBe(3);
  });

  it('counts within round 1 only when round=1', () => {
    const p = makePlayer([1, 1, 2], [1, 1, 1]);
    expect(getSpikarCount(p, 1)).toBe(2);
  });

  it('counts within round 2 only when round=2', () => {
    const p = makePlayer([1, 1, 1], [1, 0, 2]);
    expect(getSpikarCount(p, 2)).toBe(1);
  });

  it('returns 0 for player with no scores', () => {
    expect(getSpikarCount({})).toBe(0);
  });
});

describe('getChallengesDone', () => {
  it('returns 0 when all scores are 0', () => {
    const p = makePlayer([0, 0, 0], [0, 0, 0]);
    expect(getChallengesDone(p)).toBe(0);
  });

  it('counts any non-zero score as done', () => {
    const p = makePlayer([1, 0, 3], [0, 2, 0]);
    expect(getChallengesDone(p)).toBe(3);
  });

  it('counts only within round 1 when round=1', () => {
    const p = makePlayer([1, 0, 2], [3, 3, 3]);
    expect(getChallengesDone(p, 1)).toBe(2);
  });

  it('counts only within round 2 when round=2', () => {
    const p = makePlayer([1, 1, 1], [0, 0, 3]);
    expect(getChallengesDone(p, 2)).toBe(1);
  });
});
