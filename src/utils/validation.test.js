import { validatePlayersForm } from './validation';

const members = (names) => names.map((name) => ({ name, gender: "male" }));

describe('validatePlayersForm', () => {
  it('is valid for a proper form', () => {
    const result = validatePlayersForm('Sälarna', members(['Anna', 'Erik']));
    expect(result.isFormValid).toBe(true);
    expect(result.duplicateNames).toBe(false);
    expect(result.hasTooLongNames).toBe(false);
    expect(result.teamNameIsEmpty).toBe(false);
  });

  it('is invalid when teamName is empty', () => {
    const result = validatePlayersForm('', members(['Anna']));
    expect(result.isFormValid).toBe(false);
    expect(result.teamNameIsEmpty).toBe(true);
  });

  it('is invalid when teamName is only whitespace', () => {
    const result = validatePlayersForm('   ', members(['Anna']));
    expect(result.isFormValid).toBe(false);
    expect(result.teamNameIsEmpty).toBe(true);
  });

  it('is invalid when all member names are empty', () => {
    const result = validatePlayersForm('Sälarna', members(['', '', '']));
    expect(result.isFormValid).toBe(false);
    expect(result.hasAtLeastOneValidName).toBe(false);
  });

  it('detects duplicate names within the form', () => {
    const result = validatePlayersForm('Sälarna', members(['Anna', 'Anna', 'Erik']));
    expect(result.duplicateNames).toBe(true);
    expect(result.isFormValid).toBe(false);
  });

  it('detects duplicate against existing players', () => {
    const existing = [{ name: 'Anna' }];
    const result = validatePlayersForm('Sälarna', members(['Anna', 'Erik']), existing);
    expect(result.duplicateNames).toBe(true);
    expect(result.isFormValid).toBe(false);
  });

  it('is invalid when any name exceeds 10 characters', () => {
    const result = validatePlayersForm('Sälarna', members(['Alexandrina', 'Erik']));
    expect(result.hasTooLongNames).toBe(true);
    expect(result.isFormValid).toBe(false);
  });

  it('trims whitespace before checking length and duplicates', () => {
    const result = validatePlayersForm('Sälarna', members(['  Anna  ', '  Anna  ']));
    expect(result.duplicateNames).toBe(true);
  });

  it('ignores empty names when checking for duplicates', () => {
    const result = validatePlayersForm('Sälarna', members(['', '', 'Anna']));
    expect(result.duplicateNames).toBe(false);
  });

  it('is invalid when a named player has no gender set', () => {
    const form = [{ name: 'Anna', gender: null }, { name: 'Erik', gender: 'male' }];
    const result = validatePlayersForm('Sälarna', form);
    expect(result.hasUnsetGenders).toBe(true);
    expect(result.isFormValid).toBe(false);
  });

  it('is valid when all named players have a gender', () => {
    const form = [{ name: 'Anna', gender: 'female' }, { name: '', gender: null }];
    const result = validatePlayersForm('Sälarna', form);
    expect(result.hasUnsetGenders).toBe(false);
    expect(result.isFormValid).toBe(true);
  });
});
