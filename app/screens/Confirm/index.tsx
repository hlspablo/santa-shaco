import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BaseText,
  ButtonContainer,
  DividerPadding,
  LabelText,
  LabelText2,
  LabelTextContainer,
  MiddleContainer,
  OuterContainer,
  OuterRoundContainer,
  RoundContainer,
  RowContainer,
  RowWrapper,
  SimpleText,
  Square,
  SquareContainer,
  TopHeader,
  ValueText,
} from './styles';
import { LoadingComponent } from '../Loading';

import { ConfirmScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import { useStores } from '@/models';
import {
  addDashBeforeLast,
  detectAndMask,
  formatCurrency,
  formatToday,
  maskCPF,
} from '@/utils/format';

export const ConfirmScreen = observer(function () {
  const navigation = useNavigation<ConfirmScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    setup: {
      transferValue,
      ownerAccount,
      ownerAgency,
      clientName,
      clientCPF,
      clientBank,
      clientPix,
      withdraw,
    },
  } = useStores();

  function confirmTransaction() {
    withdraw();
    navigation.navigate('SuccessScreen');
  }

  return (
    <>
      <OuterContainer
        bounces={false}
        contentContainerStyle={{
          flex: 1,
        }}>
        <TopHeader height={insets.top} />
        <Header title="Pagar" onPress={navigation.goBack} />
        <SquareContainer>
          <Square>
            <RowContainer>
              <OuterRoundContainer>
                <RoundContainer>
                  <Image
                    source={require('@assets/pages/confirm/info.png')}
                    resizeMode={Image.resizeMode.cover}
                    style={{ width: 35, height: 35 }}
                  />
                </RoundContainer>
              </OuterRoundContainer>
              <LabelTextContainer>
                <LabelText2>
                  Verifique os dados antes de efetivar a transação, pois ela não poderá ser
                  desfeita.
                </LabelText2>
              </LabelTextContainer>
            </RowContainer>
          </Square>
        </SquareContainer>
        <MiddleContainer>
          <BaseText>Confirme seu pagamento</BaseText>
          <RowWrapper>
            <LabelText>Valor a pagar</LabelText>
            <ValueText>{formatCurrency(transferValue)}</ValueText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>Forma de pagamento</LabelText>
            <SimpleText>
              Ag {ownerAgency} Cc {addDashBeforeLast(ownerAccount)}
            </SimpleText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>Data do Pagamento</LabelText>
            <SimpleText>{formatToday()}</SimpleText>
          </RowWrapper>
          <DividerPadding>
            <Divider />
          </DividerPadding>
          <RowWrapper>
            <LabelText>Para</LabelText>
            <SimpleText>{clientName}</SimpleText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>CPF</LabelText>
            <SimpleText>{maskCPF(clientCPF)}</SimpleText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>Chave</LabelText>
            <SimpleText>{detectAndMask(clientPix)}</SimpleText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>Instituição</LabelText>
            <SimpleText>{clientBank.toUpperCase()}</SimpleText>
          </RowWrapper>
        </MiddleContainer>
        <ButtonContainer>
          <ActionButton text="Confirmar" onPress={confirmTransaction} />
        </ButtonContainer>
      </OuterContainer>
      <LoadingComponent />
    </>
  );
});
