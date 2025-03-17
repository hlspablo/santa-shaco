import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
  AGText,
  AddInfoText,
  BalaceLabelText,
  BalanceRowContainer,
  BalanceValueText,
  BaseText,
  BaseText2,
  BaseText3,
  BaseTextContainer,
  BookRowContainer,
  BookText,
  BottomContainer,
  CCText,
  ClientNameText,
  DividerPadding,
  DotContainer,
  GrayText,
  LogoRowContainer,
  LogoTextContainer,
  MiddleContainer,
  OuterContainer,
  OuterSquareContainer,
  PaymentContainer,
  RoundRedRot,
  RowContainer,
  Square,
  SquareBottomContainer,
  SquareContainer,
  SwitchContainer,
  TopHeader,
  SectionTitle,
} from './styles';

import { ValueScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import { SantaInputMoneyBordered } from '@/components/SantaInputMoneyBordered';
import { useSetup } from '@/store/hooks';
import { addDashBeforeLast, detectAndMask, formatCurrency, maskCPF } from '@/utils/format';

export const ValueScreen = function () {
  const [value, setValue] = React.useState(0);
  const [isValid, setIsValid] = React.useState(false);
  const {
    setup: {
      clientName,
      clientCPF,
      clientBank,
      clientPix,
      ownerAgency,
      ownerAccount,
      balance,
      setTransferValue,
    },
  } = useSetup();

  const navigation = useNavigation<ValueScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  function goToConfirm() {
    setTransferValue(value);
    navigation.navigate('ConfirmScreen');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <TopHeader height={insets.top} />
      <Header title="Definir transferência" onPress={navigation.goBack} redBackground />

      <OuterContainer bounces={false}>
        <BaseTextContainer style={{ paddingBottom: 15 }}>
          <BaseText>
            Para <Text style={{ fontWeight: 'bold' }}>{clientName}</Text>
          </BaseText>
          <GrayText>
            CPF: {maskCPF(clientCPF)} - {clientBank.toUpperCase()}
          </GrayText>
          <GrayText>Chave: {detectAndMask(clientPix)}</GrayText>
        </BaseTextContainer>
        <BottomContainer style={{ paddingTop: 0 }}>
          <Text
            style={{
              fontSize: 18,
              color: '#ba261a',
              marginBottom: 8,
              textDecorationLine: 'underline',
            }}>
            Adicionar mensagem
          </Text>
        </BottomContainer>
        <Divider />

        <View style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 18, color: '#333', marginLeft: 20, marginBottom: 5 }}>
            Qual o valor?
          </Text>
          <SantaInputMoneyBordered
            label="Valor"
            value={value}
            setValue={setValue}
            onValidation={setIsValid}
          />
        </View>

        <Divider />

        <View style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 18, color: '#333', marginLeft: 20, marginBottom: 8 }}>
            Quando vai ser feito?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcon name="calendar-today" size={22} color="#333" />
              <Text style={{ fontSize: 18, marginLeft: 15, fontWeight: 'bold' }}>
                Hoje, 17 de Mar
              </Text>
            </View>
            <Text style={{ color: '#ba261a', fontSize: 16, textDecorationLine: 'underline' }}>
              Agendar
            </Text>
          </View>
        </View>

        <Divider />

        <View style={{ paddingVertical: 5 }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            <Text style={{ fontSize: 18, marginBottom: 20, color: '#333' }}>
              Como você quer pagar?
            </Text>
            <Icon name="eye" size={20} color="#333" />
          </View>

          <View
            style={{
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: '#ba261a',
              borderRadius: 8,
              backgroundColor: 'white',
              overflow: 'hidden',
            }}>
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0.5,
                    borderColor: '#ba261a',
                    marginRight: 10,
                  }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: '#ba261a',
                    }}
                  />
                </View>
                <Text style={{ fontSize: 18, color: '#666' }}>Conta corrente</Text>
              </View>
            </View>

            <Divider />

            <View style={{ padding: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text style={{ fontSize: 16, color: '#666' }}>
                  Ag {ownerAgency} CC {addDashBeforeLast(ownerAccount)}
                </Text>
                <Text
                  style={{
                    color: '#ba261a',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                  }}>
                  Alterar conta
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text style={{ fontSize: 16, color: '#666' }}>Saldo disponível</Text>
                <View
                  style={{
                    width: 100,
                    height: 5,
                    backgroundColor: '#666',
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, color: '#666' }}>Saldo + Limite</Text>
                <View
                  style={{
                    width: 100,
                    height: 5,
                    backgroundColor: '#666',
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </OuterContainer>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 30,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}>
          <ActionButton onPress={goToConfirm} text="Continuar" disabled={!isValid} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
