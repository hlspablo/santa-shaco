import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomContainer, Container, InputContainer, TopHeader } from './styles';

import { LoginScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import { SantaInputCPFObfuscated } from '@/components/SantaInput-Cpf-Obs';
import { SantaInputPassword } from '@/components/SantaInput-Password';
import { useStores } from '@/models';

export const LoginScreen = observer(function () {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [password, setPassword] = React.useState('');
  const insets = useSafeAreaInsets();

  const {
    setup: { ownerCPF },
  } = useStores();

  function goToMain() {
    navigation.navigate('MainScreen');
  }

  return (
    <>
      <Container
        bounces={false}
        contentContainerStyle={{
          flex: 1,
        }}>
        <TopHeader height={insets.top} />
        <Pressable onPress={navigation.goBack}>
          <Image
            source={require('@assets/pages/login/header.png')}
            resizeMode={Image.resizeMode.cover}
            style={{ width: '100%', height: 48, backgroundColor: '#BA261A' }}
          />
        </Pressable>
        <Image
          source={require('@assets/pages/login/access.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 80, backgroundColor: '#BA261A' }}
        />
        <InputContainer>
          <SantaInputCPFObfuscated
            clearable={false}
            label="CPF"
            text={ownerCPF}
            setText={() => {}}
          />
        </InputContainer>
        <Image
          source={require('@assets/pages/login/cpf_rem.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 80, backgroundColor: '#BA261A' }}
        />
        <InputContainer>
          <SantaInputPassword
            clearable={false}
            text={password}
            setText={setPassword}
            label="Senha"
          />
        </InputContainer>
        <Image
          source={require('@assets/pages/login/faceid.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 120, backgroundColor: '#BA261A' }}
        />
        <BottomContainer>
          <ActionButton onPress={goToMain} text="Entrar" />
        </BottomContainer>
      </Container>
    </>
  );
});
