/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */

import './app/utils/ignoreWarnings';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'jotai/react';
import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator, useNavigationPersistence } from './app/navigators';
import { StoreProvider } from './app/store';
import { customFontsToLoad } from './app/theme';
import * as storage from './app/utils/storage';

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

/**
 * This is the root component of our app.
 */
function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const [areFontsLoaded] = useFonts(customFontsToLoad);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([
          /* Add any other initialization here */
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && areFontsLoaded && isNavigationStateRestored) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, areFontsLoaded, isNavigationStateRestored]);

  // Before we show the app, we have to wait for our state to be ready.
  if (!isNavigationStateRestored || !areFontsLoaded || !appIsReady) {
    return null;
  }

  // otherwise, we're ready to render the app
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider>
        <StoreProvider>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppNavigator
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </SafeAreaProvider>
        </StoreProvider>
      </Provider>
    </View>
  );
}

export default App;
