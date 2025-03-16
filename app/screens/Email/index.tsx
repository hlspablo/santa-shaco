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

import { EmailScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import Header from '@/components/Header';
import { SantaInputEmail } from '@/components/SantaInput-Email';
import { useSetup } from '@/store/hooks';

export const EmailScreen = function () {
  const [text, setText] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const { setup } = useSetup();
  const navigation = useNavigation<EmailScreenNavigationProp>();
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
          <BaseText>Qual o e-mail de quem vai receber?</BaseText>
        </BaseTextContainer>
        <SantaInputEmail label="E-mail" text={text} setText={setText} onValidation={setIsValid} />
      </MiddleContainer>
      <ButtonContainer>
        <ActionButton onPress={setPix} text="Continuar" disabled={!isValid} />
      </ButtonContainer>
    </OuterContainer>
  );
};
