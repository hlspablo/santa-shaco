import React from 'react';

import { useSetup } from '@/store/hooks';

/**
 * COMPATIBILITY LAYER
 *
 * This is just here to maintain compatibility with existing code
 * that imports from the old location.
 *
 * This passes through to the new Jotai-based implementation.
 */
export const useStores = useSetup;

/**
 * DEPRECATED
 *
 * This used to set up the RootStore and rehydration.
 * Now it's just a no-op compatibility function that calls the callback.
 */
export const useInitialRootStore = (callback: () => void | Promise<void>) => {
  // The actual initialization happens in the StoreProvider now
  if (callback) {
    setTimeout(callback, 0);
  }

  return { rehydrated: true };
};

// For backward compatibility, provide empty provider
export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  children;
