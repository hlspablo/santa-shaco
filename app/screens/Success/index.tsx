import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ButtonContainer,
  DividerPadding,
  LabelText,
  LabelText2,
  LabelTextContainer,
  MiddleContainer,
  OuterContainer,
  RowContainer,
  RowWrapper,
  SeeVoucher,
  SimpleText,
  Square,
  SquareContainer,
  TopHeader,
  ValueText,
} from './styles';
import { LoadingComponent } from '../Loading';

import { SuccessScreenNavigationProp } from '@/@types/navigation';
import { ShareButton } from '@/components/Buttons/Share/ActionButton';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import { useSetup } from '@/store/hooks';
import { addDashBeforeLast, detectAndMask, formatCurrency, maskCPF } from '@/utils/format';

export const SuccessScreen = function () {
  const navigation = useNavigation<SuccessScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  const {
    setup: {
      transferValue,
      clientName,
      clientCPF,
      clientBank,
      lastTransactionAuthCode,
      lastTransactionNumber,
      lastTransactionTime,
      ownerAccount,
      ownerAgency,
      ownerBank,
      ownerCPF,
      clientPix,
      ownerName,
    },
  } = useSetup();

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          .break-page {
            page-break-after: always; 
          }
          .main-container { 
            display: flex;
            flex-direction: column;
            padding-left: 9%;
            padding-right: 9%;
          }
          .page-2 {
            display:flex;
            flex-direction: column;
            height: 94vh;
            padding-left: 9%;
            padding-right: 9%;
            padding-top: 20px;
            padding-bottom: 20px;
          }
          body {
            font-family: Arial, sans-serif;
          }
          h2 {
            color: black;
            font-size: 24px;
          }
          .section {
            margin-bottom: 32px;
          }
          .section:last-child {
            border-bottom: none;
          }
          .section-title {
            color: #6f6f6f;
            font-size: 19px;
          }
          .section-value {
            color: #000000;
            font-size: 21px;
          }
          .header-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 45px;
          }
          .page-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          .middle-area {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .mt-5 {
            margin-top: 20px;
          }
          .font {
            font-size: 25px;
          }
          .payment {
            padding-top: 20px;
            padding-bottom: 15px;
            font-size: 32px;
            color: #000;
          }
          .top-date {
            color: #6f6f6f;
            font-size: 18px;
            padding-bottom: 15px;
          }
          .voucher-page-text {
            color: #5c5c5c; 
            font-size: 20px; 
            padding-bottom: 20px; 
            padding-top: 30px; 
            margin-left: 8%;
            margin-right: 8%;
          }
          @page {
            margin: 20px;
          }
        </style>
      </head>
      <body>
        <div class="main-container">
          <div class="header-container">
            <img src="data:image/png;base64,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" alt="Santander" style="width: 165px; height: 29px">
            <span class="payment">Comprovante do Pagamento</span>
            <span class="top-date">13/10/2023 - 13:05:23</span>
          </div>
          <hr style="border: 1px solid #848484; width: 100%; margin-top: 10px; margin-bottom: 10px;"/>
          <div style="margin-top: 10px; padding-left: 4px;">
            <div class="section-title">Valor pago</div>
            <div class="section-value">${formatCurrency(transferValue)}</div>
          </div>
          <hr style="border: 1px solid #848484; width: 100%; margin-bottom: 10px;"/>
          <div class="section" style="margin-top: 32px;">
            <div class="section-title">Forma de pagamento</div>
            <div class="section-value">Ag ${ownerAgency} Cc ${addDashBeforeLast(ownerAccount)}</div>
          </div>
          <div class="section" style="margin-top: 10px;">
            <div class="section-title">Dados do recebedor</div>
          </div>
          <div class="section" style="margin-top: 20px;">
            <div class="section-title">Para</div>
            <div class="section-value">${clientName}</div>
          </div>
          <div class="section">
            <div class="section-title">CPF</div>
            <div class="section-value">${maskCPF(clientCPF)}</div>
          </div>
          <div class="section">
            <div class="section-title">Chave</div>
            <div class="section-value">${detectAndMask(clientPix)}</div>
          </div>
          <div class="section">
            <div class="section-title">Instituição</div>
            <div class="section-value">${clientBank.toUpperCase()}</div>
          </div>
          <div class="section">
            <div class="section-title">Dados do pagador</div>
          </div>
          <div class="section" style="margin-top: 30px;">
            <div class="section-title">De</div>
            <div class="section-value">${ownerName}</div>
          </div>
          <div class="section">
            <div class="section-title">CPF</div>
            <div class="section-value">${maskCPF(ownerCPF)}</div>
          </div>
          <div class="section">
            <div class="section-title">Instituição</div>
            <div class="section-value">${ownerBank.toUpperCase()}</div>
          </div>
          <div class="section">
            <div class="section-title">ID/Transação</div>
            <div class="section-value">${lastTransactionNumber}</div>
          </div>
          <div class="section">
            <div class="section-title">Data e hora da transação</div>
            <div class="section-value">${lastTransactionTime}</div>
          </div>
        </div>
        <div class="page-bottom voucher-page-text">
          <span>Comprovante do Pagamento</span>
          <span>1/2</span>
        </div>
        <div class="page-2">
          <div class="section" style="margin-top: 70px;">
            <div class="section-title">Código de autenticação</div>
            <div class="section-value">${lastTransactionAuthCode}</div>
          </div>
          <hr style="border: 1px solid #848484; width: 100%; margin-bottom: 10px;"/>
          <div class="middle-area">
            <div class="section-value font">Central de Atendimento Santander</div>
            <div class="section-title mt-5">4004-3535 (Capitais & Regiões Metropolitanas)</div>
            <div class="section-title mt-5">0800-702-3535 (Demais Localidades)</div>
            <div class="section-title mt-5">SAC 0800-762-7777</div>
            <div class="section-title mt-5">Ouvidoria 0800-726-0332</div>
          </div>
        </div>
        <div class="page-bottom voucher-page-text">
          <span>Comprovante do Pagamento</span>
          <span>1/2</span>
        </div>
      </body>
    </html>
    `;

  function goToMainScreen() {
    navigation.navigate('MainScreen');
  }

  function goToVoucherScreen() {
    navigation.navigate('VoucherScreen');
  }

  async function printToFile() {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
      height: 1065,
      width: 612,
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  return (
    <>
      <OuterContainer
        bounces={false}
        contentContainerStyle={{
          flex: 1,
        }}>
        <TopHeader height={insets.top} />
        <Header onPress={goToMainScreen} title="Comprovante" showClose />
        <SquareContainer>
          <Square>
            <RowContainer>
              <Image
                source={require('@assets/pages/success/ok.png')}
                resizeMode={Image.resizeMode.cover}
                style={{ width: 35, height: 35 }}
              />
              <LabelTextContainer>
                <LabelText2>Pronto! Seu pagamento foi realizado</LabelText2>
              </LabelTextContainer>
            </RowContainer>
          </Square>
        </SquareContainer>
        <MiddleContainer>
          <RowWrapper>
            <LabelText>Valor pago</LabelText>
            <ValueText>{formatCurrency(transferValue)}</ValueText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>Para</LabelText>
            <SimpleText>{clientName}</SimpleText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>CPF</LabelText>
            <SimpleText>{maskCPF(clientCPF)}</SimpleText>
          </RowWrapper>
          <RowWrapper>
            <LabelText>Instituição</LabelText>
            <SimpleText>{clientBank.toUpperCase()}</SimpleText>
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
          <ShareButton onPress={printToFile} text="Salvar ou Compartilhar" />
          <Pressable onPress={goToVoucherScreen}>
            <SeeVoucher>Ver comprovante completo</SeeVoucher>
          </Pressable>
        </ButtonContainer>
      </OuterContainer>
      <LoadingComponent />
    </>
  );
};
