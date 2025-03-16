import { useNavigation } from '@react-navigation/native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {
  BaseText,
  BaseTextContainer,
  HintText,
  LeftContainer,
  MiddleContainer,
  OuterContainer,
  RowContainer,
  RowText,
  TopHeader,
} from './styles';

import { SelectScreenNavigationProp } from '@/@types/navigation';
import Divider from '@/components/Divider';
import Header from '@/components/Header';

export const SelectScreen = function () {
  const navigation = useNavigation<SelectScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  function goToCPFScreen() {
    navigation.navigate('CPFScreen');
  }
  function goToEmailScreen() {
    navigation.navigate('EmailScreen');
  }
  function goToPhoneScreen() {
    navigation.navigate('PhoneScreen');
  }
  return (
    <OuterContainer>
      <TopHeader height={insets.top} />
      <Header title="Pagar" onPress={navigation.goBack} />
      <MiddleContainer>
        <BaseTextContainer>
          <BaseText>Escolha a chave para identificar quem vai receber</BaseText>
        </BaseTextContainer>
        <RowContainer onPress={goToCPFScreen}>
          <LeftContainer>
            <Image
              source={require('@assets/pages/select/cpf.png')}
              resizeMode={Image.resizeMode.cover}
              style={{ width: 25, height: 25 }}
            />
            <RowText>CPF ou CNPJ</RowText>
          </LeftContainer>
          <SimpleLineIcon name="arrow-right" size={20} color="#000" />
        </RowContainer>
        <Divider />
        <RowContainer onPress={goToPhoneScreen}>
          <LeftContainer>
            <SimpleLineIcon name="screen-smartphone" size={25} color="#ba261a" />
            <RowText>Celular</RowText>
          </LeftContainer>
          <SimpleLineIcon name="arrow-right" size={20} color="#000" />
        </RowContainer>
        <Divider />
        <RowContainer onPress={goToEmailScreen}>
          <LeftContainer>
            <FontistoIcon name="email" size={25} color="#ba261a" />
            <RowText>E-mail</RowText>
          </LeftContainer>
          <SimpleLineIcon name="arrow-right" size={20} color="#000" />
        </RowContainer>
        <Divider />
        <RowContainer>
          <LeftContainer>
            <Image
              source={require('@assets/pages/select/agen.png')}
              resizeMode={Image.resizeMode.cover}
              style={{ width: 25, height: 25 }}
            />
            <RowText>Agência e conta</RowText>
          </LeftContainer>
          <SimpleLineIcon name="arrow-right" size={20} color="#000" />
        </RowContainer>
        <Divider />
        <RowContainer>
          <LeftContainer>
            <Image
              source={require('@assets/pages/select/pix.png')}
              resizeMode={Image.resizeMode.cover}
              style={{ width: 25, height: 25 }}
            />
            <RowText>Pix copia e cola</RowText>
          </LeftContainer>
          <SimpleLineIcon name="arrow-right" size={20} color="#000" />
        </RowContainer>
        <HintText>Cole ou digite um código de pagamento</HintText>
        <Divider />
        <RowContainer>
          <LeftContainer>
            <Image
              source={require('@assets/pages/select/console.png')}
              resizeMode={Image.resizeMode.cover}
              style={{ width: 25, height: 25 }}
            />
            <RowText>Chave aleatória</RowText>
          </LeftContainer>
          <SimpleLineIcon name="arrow-right" size={20} color="#000" />
        </RowContainer>
        <HintText>Um código criado pelo Pix</HintText>
        <Divider />
      </MiddleContainer>
    </OuterContainer>
  );
};
