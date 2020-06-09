import { useCallback, MouseEvent, DependencyList } from 'react';

/* Transparent wrapper around `useCallback` with typings */
export function useButtonClick(callback: (e: MouseEvent<HTMLButtonElement>) => void, deps: DependencyList) {
  return useCallback(callback, deps);
}
