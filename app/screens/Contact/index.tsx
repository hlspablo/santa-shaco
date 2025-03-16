import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContactText, MiddleContainer, OuterContainer, PayContactText, TopHeader } from './styles';

import { ContactScreenNavigationProp } from '@/@types/navigation';
import Header from '@/components/Header';

export const ContactScreen = function () {
  const navigation = useNavigation<ContactScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  function goToSelectScreen() {
    navigation.navigate('SelectScreen');
  }

  return (
    <OuterContainer>
      <TopHeader height={insets.top} />
      <Header title="Pix" onPress={navigation.goBack} />
      <MiddleContainer>
        <Image
          source={require('@assets/pages/contact/mag.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: 45, height: 45 }}
        />
        <ContactText
          style={{
            paddingTop: 16,
          }}>
          Nenhum contato
        </ContactText>
        <ContactText>
          Você não tem nenhum contato. Salve seus contatos e tenha mais agilidade para pagar
        </ContactText>
        <Pressable onPress={goToSelectScreen}>
          <PayContactText>Pagar novo contato</PayContactText>
        </Pressable>
      </MiddleContainer>
    </OuterContainer>
  );
};
