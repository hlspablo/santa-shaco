import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container, TopHeader } from './styles';

import { StartupScreenNavigationProp } from '@/@types/navigation';

export const StartupScreen = function () {
  const navigation = useNavigation<StartupScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  function goToLogin() {
    navigation.navigate('LoginScreen');
  }
  function goToSetup() {
    navigation.navigate('SetupScreen');
  }

  return (
    <Container>
      <TopHeader height={insets.top} />
      <Pressable onPress={goToSetup}>
        <Image
          source={require('@assets/pages/home/top.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 48, backgroundColor: '#BA261A' }}
        />
      </Pressable>

      <Image
        source={require('@assets/pages/home/middle.png')}
        resizeMode={Image.resizeMode.cover}
        style={{ width: '100%', height: 500, backgroundColor: '#ec0200' }}
      />
      <Pressable onPress={goToLogin}>
        <Image
          source={require('@assets/pages/home/actions.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 180, backgroundColor: '#E6EAED' }}
        />
      </Pressable>
      <Image
        source={require('@assets/pages/home/bottom.png')}
        resizeMode={Image.resizeMode.cover}
        style={{
          width: '100%',
          height: 100,
          backgroundColor: '#E6EAED',
          position: 'absolute',
          bottom: 0,
        }}
      />
    </Container>
  );
};
