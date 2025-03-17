import LottieView from 'lottie-react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';

import { AnimationContainer } from './styles';

export const LoadingComponent = function () {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const randomTime = Math.random() * 1000 + 1000;

    const timerId = setTimeout(() => {
      setLoading(false);
    }, randomTime);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <>
      {loading ? (
        <AnimationContainer>
          <LottieView
            style={{
              height: ms(120),
              width: ms(120),
            }}
            source={require('@assets/animations/loading.json')}
            autoPlay
            loop
          />
        </AnimationContainer>
      ) : (
        <></>
      )}
    </>
  );
};
