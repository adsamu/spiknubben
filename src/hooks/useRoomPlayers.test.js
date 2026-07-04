import { renderHook, act } from '@testing-library/react';
import { useRoomPlayers } from './useRoomPlayers';

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  onSnapshot: vi.fn(),
}));

vi.mock('@/firebase-config', () => ({ db: {} }));

import { onSnapshot } from 'firebase/firestore';

const makeDocs = (players) =>
  players.map((p) => ({ id: p.id, data: () => ({ ...p }) }));

describe('useRoomPlayers', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns empty array before snapshot fires', () => {
    onSnapshot.mockImplementation(() => () => {});
    const { result } = renderHook(() => useRoomPlayers('ROOM1'));
    expect(result.current).toEqual([]);
  });

  it('returns players populated from snapshot', () => {
    const fakePlayers = [
      { id: 'p1', name: 'Anna', gender: 'female', teamId: 'T1', teamName: 'Sälarna', scores: { 1: [1], 2: [0] } },
      { id: 'p2', name: 'Erik', gender: 'male', teamId: 'T1', teamName: 'Sälarna', scores: { 1: [2], 2: [0] } },
    ];

    onSnapshot.mockImplementation((_ref, callback) => {
      callback({ docs: makeDocs(fakePlayers) });
      return () => {};
    });

    const { result } = renderHook(() => useRoomPlayers('ROOM1'));
    expect(result.current).toHaveLength(2);
    expect(result.current[0].name).toBe('Anna');
    expect(result.current[1].name).toBe('Erik');
  });

  it('calls the unsubscribe function on unmount', () => {
    const unsubscribe = vi.fn();
    onSnapshot.mockImplementation(() => unsubscribe);

    const { unmount } = renderHook(() => useRoomPlayers('ROOM1'));
    unmount();
    expect(unsubscribe).toHaveBeenCalledOnce();
  });

  it('re-subscribes when roomCode changes', () => {
    onSnapshot.mockImplementation(() => () => {});
    const { rerender } = renderHook(({ roomCode }) => useRoomPlayers(roomCode), {
      initialProps: { roomCode: 'ROOM1' },
    });
    rerender({ roomCode: 'ROOM2' });
    expect(onSnapshot).toHaveBeenCalledTimes(2);
  });
});
