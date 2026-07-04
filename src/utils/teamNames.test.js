import { generateTeamName } from './teamNames';

describe('generateTeamName', () => {
  it('returns a non-empty string', () => {
    expect(typeof generateTeamName()).toBe('string');
    expect(generateTeamName().length).toBeGreaterThan(0);
  });

  it('joins exactly one adjective and one noun with a space', () => {
    const name = generateTeamName();
    const parts = name.split(' ');
    expect(parts).toHaveLength(2);
    expect(parts[0].length).toBeGreaterThan(0);
    expect(parts[1].length).toBeGreaterThan(0);
  });

  it('produces different values across repeated calls', () => {
    const names = new Set(Array.from({ length: 20 }, generateTeamName));
    expect(names.size).toBeGreaterThan(1);
  });
});
