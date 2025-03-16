import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container, OuterContainer, TopHeader } from './styles';

import { MethodScreenNavigationProp } from '@/@types/navigation';

export const MethodScreen = function () {
  const navigation = useNavigation<MethodScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  function goToContactScreen() {
    navigation.navigate('ContactScreen');
  }
  return (
    <OuterContainer>
      <TopHeader height={insets.top} />
      <Pressable onPress={navigation.goBack}>
        <Image
          source={require('@assets/pages/method/header.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 48, backgroundColor: '#BA261A' }}
        />
      </Pressable>
      <Container bounces={false}>
        <Pressable onPress={goToContactScreen}>
          <Image
            source={require('@assets/pages/method/methods.png')}
            resizeMode={Image.resizeMode.cover}
            style={{ width: '100%', height: 530, backgroundColor: '#BA261A' }}
          />
        </Pressable>
        <Image
          source={require('@assets/pages/method/methods-2.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 610, backgroundColor: '#BA261A' }}
        />
      </Container>
    </OuterContainer>
  );
};
