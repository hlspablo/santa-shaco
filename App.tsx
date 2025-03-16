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
import { Provider } from 'jotai/react';
import { useState, useCallback } from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator, useNavigationPersistence } from './app/navigators';
import { StoreProvider } from './app/store';
import { customFontsToLoad } from './app/theme';
import * as storage from './app/utils/storage';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props;
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const [areFontsLoaded] = useFonts(customFontsToLoad);
  const [isReady, setIsReady] = useState(false);

  const onStoreInitialized = useCallback(() => {
    // This runs after the store has been initialized.
    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(hideSplashScreen, 500);
    setIsReady(true);
  }, [hideSplashScreen]);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!isNavigationStateRestored || !areFontsLoaded) return null;

  // otherwise, we're ready to render the app
  return (
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
  );
}

export default App;
