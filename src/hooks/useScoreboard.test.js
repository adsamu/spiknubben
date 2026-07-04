import { renderHook } from '@testing-library/react';
import { useScoreboard } from './useScoreboard';

// useScoreboard uses a relative import for firebase-config; mock both paths
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  onSnapshot: vi.fn(),
  query: vi.fn(),
}));

vi.mock('@/firebase-config', () => ({ db: {} }));
vi.mock('../firebase-config', () => ({ db: {} }));

import { onSnapshot } from 'firebase/firestore';

const makeDocs = (players) =>
  players.map((p) => ({ id: p.id, data: () => ({ ...p }) }));

describe('useScoreboard', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns empty array when snapshot has no docs', () => {
    onSnapshot.mockImplementation((_ref, callback) => {
      callback({ docs: [] });
      return () => {};
    });
    const { result } = renderHook(() => useScoreboard('ROOM1'));
    expect(result.current).toEqual([]);
  });

  it('sorts players by lowest round-1 total first', () => {
    const players = [
      { id: 'p1', name: 'High', scores: { 1: [3, 3, 3], 2: [0, 0, 0] } },
      { id: 'p2', name: 'Low', scores: { 1: [1, 1, 1], 2: [0, 0, 0] } },
      { id: 'p3', name: 'Mid', scores: { 1: [2, 2, 2], 2: [0, 0, 0] } },
    ];

    onSnapshot.mockImplementation((_ref, callback) => {
      callback({ docs: makeDocs(players) });
      return () => {};
    });

    const { result } = renderHook(() => useScoreboard('ROOM1'));
    expect(result.current[0].name).toBe('Low');
    expect(result.current[1].name).toBe('Mid');
    expect(result.current[2].name).toBe('High');
  });

  it('calls unsubscribe on unmount', () => {
    const unsubscribe = vi.fn();
    onSnapshot.mockImplementation(() => unsubscribe);

    const { unmount } = renderHook(() => useScoreboard('ROOM1'));
    unmount();
    expect(unsubscribe).toHaveBeenCalledOnce();
  });
});
