import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BaseText,
  ButtonContainer,
  DividerPadding,
  LabelText,
  LabelText2,
  MiddleContainer,
  OuterContainer,
  HeaderText,
  RowWrapper,
  SimpleText,
  TopHeader,
  ValueText,
  HeaderContainer,
} from './styles';
import { BaseText2 } from '../Value/styles';

import Divider from '@/components/Divider';
import { HeaderVoucher } from '@/components/HeaderVoucher';
import { useSetup } from '@/store/hooks';
import { addDashBeforeLast, detectAndMask, formatCurrency, maskCPF } from '@/utils/format';

export const VoucherScreen = function () {
  const insets = useSafeAreaInsets();
  const {
    setup: {
      lastTransactionAuthCode,
      lastTransactionNumber,
      lastTransactionTime,
      transferValue,
      ownerAccount,
      ownerAgency,
      clientName,
      clientCPF,
      clientBank,
      clientPix,
      ownerName,
      ownerCPF,
      ownerBank,
    },
  } = useSetup();

  return (
    <OuterContainer bounces={false}>
      <TopHeader height={insets.top} />
      <HeaderVoucher title="Pagar" />
      <HeaderContainer>
        <HeaderText>Comprovante de Pagamento</HeaderText>
        <LabelText>{lastTransactionTime}</LabelText>
      </HeaderContainer>
      <DividerPadding>
        <Divider />
      </DividerPadding>
      <MiddleContainer>
        <RowWrapper>
          <LabelText>Valor pago</LabelText>
          <ValueText>{formatCurrency(transferValue)}</ValueText>
        </RowWrapper>
        <RowWrapper>
          <LabelText>Forma de pagamento</LabelText>
          <SimpleText>
            Ag {ownerAgency} Cc {addDashBeforeLast(ownerAccount)}
          </SimpleText>
        </RowWrapper>
        <DividerPadding>
          <Divider />
        </DividerPadding>
        <BaseText>Dados do recebedor</BaseText>
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
        <DividerPadding>
          <Divider />
        </DividerPadding>
        <BaseText>Dados do pagador</BaseText>
        <RowWrapper>
          <LabelText>De</LabelText>
          <SimpleText>{ownerName}</SimpleText>
        </RowWrapper>
        <RowWrapper>
          <LabelText>CPF</LabelText>
          <SimpleText>{maskCPF(ownerCPF)}</SimpleText>
        </RowWrapper>
        <RowWrapper>
          <LabelText>Instituição</LabelText>
          <SimpleText>{ownerBank.toUpperCase()}</SimpleText>
        </RowWrapper>
        <DividerPadding>
          <Divider />
        </DividerPadding>
        <RowWrapper>
          <LabelText>ID/Transação</LabelText>
          <SimpleText>{lastTransactionNumber}</SimpleText>
        </RowWrapper>
        <RowWrapper>
          <LabelText>Data e hora da transação</LabelText>
          <SimpleText>{lastTransactionTime}</SimpleText>
        </RowWrapper>
        <RowWrapper>
          <LabelText>Código de autenticação</LabelText>
          <SimpleText>{lastTransactionAuthCode}</SimpleText>
        </RowWrapper>
        <DividerPadding>
          <Divider />
        </DividerPadding>
      </MiddleContainer>
      <ButtonContainer>
        <BaseText2>Central de Atendimento Santander</BaseText2>
        <LabelText2>4004-3535 (Capitais e Regiões Metropolitanas)</LabelText2>
        <LabelText2>0800-702-3535 (Demais Localidades)</LabelText2>
        <LabelText2>SAC 0800-762-7777</LabelText2>
        <LabelText2>Ouvidoria 0800-762-0322</LabelText2>
      </ButtonContainer>
    </OuterContainer>
  );
};
