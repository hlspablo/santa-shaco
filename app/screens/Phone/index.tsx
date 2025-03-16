import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BaseText,
  BaseTextContainer,
  ButtonContainer,
  MiddleContainer,
  OuterContainer,
  TopHeader,
} from './styles';

import { PhoneScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import Header from '@/components/Header';
import { SantaInputPhone } from '@/components/SantaInput-Phone';
import { useSetup } from '@/store/hooks';

export const PhoneScreen = function () {
  const [text, setText] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const { setup } = useSetup();
  const navigation = useNavigation<PhoneScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  function setPix() {
    if (isValid) {
      setup.setSetupData({ ...setup, clientPix: text });
      navigation.navigate('ValueScreen');
    }
  }
  return (
    <OuterContainer
      bounces={false}
      contentContainerStyle={{
        flex: 1,
      }}>
      <TopHeader height={insets.top} />
      <Header title="Pagar" onPress={navigation.goBack} />
      <MiddleContainer>
        <BaseTextContainer>
          <BaseText>Qual o celular de quem vai receber?</BaseText>
        </BaseTextContainer>
        <SantaInputPhone label="Celular" text={text} setText={setText} onValidation={setIsValid} />
      </MiddleContainer>
      <ButtonContainer>
        <ActionButton onPress={setPix} text="Continuar" disabled={!isValid} />
      </ButtonContainer>
    </OuterContainer>
  );
};
