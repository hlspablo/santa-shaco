import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { setupAtom, initializeStore } from './atoms';

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [, setSetup] = useAtom(setupAtom);

  useEffect(() => {
    const initialize = async () => {
      try {
        const initialData = await initializeStore();
        setSetup(initialData);
      } catch (error) {
        console.error('Failed to initialize store:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, [setSetup]);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ec0200" />
      </View>
    );
  }

  return <>{children}</>;
};
