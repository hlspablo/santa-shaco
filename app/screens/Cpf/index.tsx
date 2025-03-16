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

import { CPFScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import Header from '@/components/Header';
import { SantaInputCPF } from '@/components/SantaInput-Cpf';
import { useSetup } from '@/store/hooks';

export const CPFScreen = function () {
  const [text, setText] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const { setup } = useSetup();
  const navigation = useNavigation<CPFScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  function setPix() {
    if (isValid) {
      setup.setSetupData({ ...setup, clientPix: text });
      navigation.navigate('ValueScreen');
    }
  }

  return (
    <OuterContainer
      contentContainerStyle={{
        flex: 1,
      }}>
      <TopHeader height={insets.top} />
      <Header title="Pagar" onPress={navigation.goBack} />
      <MiddleContainer>
        <BaseTextContainer>
          <BaseText>Qual o CPF ou CNPJ de quem vai receber?</BaseText>
        </BaseTextContainer>
        <SantaInputCPF
          label="CPF ou CNPJ"
          text={text}
          setText={setText}
          onValidation={setIsValid}
        />
      </MiddleContainer>
      <ButtonContainer>
        <ActionButton onPress={setPix} text="Continuar" disabled={!isValid} />
      </ButtonContainer>
    </OuterContainer>
  );
};
