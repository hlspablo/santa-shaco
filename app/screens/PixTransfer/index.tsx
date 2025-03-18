import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {
  BaseText,
  CircleAvatar,
  ContactItem,
  ContactList,
  ContactName,
  ContactsContainer,
  ContactsHeading,
  InitialsText,
  InputContainer,
  OtherOptionsContainer,
  OtherOptionsItem,
  OtherOptionsTitle,
  OuterContainer,
  SeeAllButton,
  SeeAllText,
  TopHeader,
} from './styles';

import Header from '@/components/Header';
import { useSetup } from '@/store/hooks';

// Mock contacts data
const mockContacts = [
  { id: '1', name: 'Rita', initials: 'RT' },
  { id: '2', name: 'Maria', initials: 'MA' },
  { id: '3', name: 'Ricardo', initials: 'RC' },
  { id: '4', name: 'Selma', initials: 'SR' },
  { id: '5', name: 'Yan', initials: 'YS' },
  { id: '6', name: 'Pedro', initials: 'PS' },
  { id: '7', name: 'Roger', initials: 'RG' },
];

export interface PixTransferProps {
  navigation?: any;
}

// Helper functions for input masking
const formatCPF = (value: string): string => {
  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '');

  // Apply CPF mask (XXX.XXX.XXX-XX) only when it reaches 11 digits
  if (numbers.length === 11) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }

  // Otherwise return the raw numbers
  return numbers;
};

// CPF validation function
const isValidCPF = (cpf: string): boolean => {
  // Remove non-numeric characters
  const numbers = cpf.replace(/\D/g, '');

  // CPF must have 11 digits
  if (numbers.length !== 11) return false;

  // Check for known invalid CPFs (all same digits)
  if (/^(\d)\1{10}$/.test(numbers)) return false;

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers.charAt(9))) return false;

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers.charAt(10))) return false;

  return true;
};

// Smart mask function that detects input type and applies the correct format
const applySmartMask = (value: string): string => {
  // Empty input check
  if (!value || value.trim() === '') return '';

  // Email detection
  if (value.includes('@')) {
    return value;
  }

  // Clean the input (remove non-alphanumeric characters)
  const cleaned = value.replace(/\D/g, '');

  // For non-numeric inputs, return as is
  if (!cleaned) return value;

  // Apply masks only when reaching full length
  if (cleaned.length === 11) {
    // Simple rule: If valid CPF, use CPF mask. Otherwise, use phone mask.
    if (isValidCPF(cleaned)) {
      return formatCPF(cleaned);
    } else {
      return formatPhone(cleaned);
    }
  } else if (cleaned.length === 14) {
    // CNPJ format for 14 digits
    return formatCNPJ(cleaned);
  } else if (cleaned.length === 10) {
    // Phone format for 10 digits
    return formatPhone(cleaned);
  }

  // Special case for explicit phone format
  if (value.startsWith('(')) {
    return formatPhone(cleaned);
  }

  // Return raw numbers for all other cases
  return cleaned;
};

const formatCNPJ = (value: string): string => {
  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '');

  // Apply CNPJ mask (XX.XXX.XXX/XXXX-XX) only when it reaches 14 digits
  if (numbers.length === 14) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  }

  // Otherwise return the raw numbers
  return numbers;
};

const formatPhone = (value: string): string => {
  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '');

  // Apply phone mask ((XX) XXXXX-XXXX) only when it reaches 10 or 11 digits
  if (numbers.length === 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  } else if (numbers.length === 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }

  // Special case: if user explicitly starts with "(", keep that formatting
  if (value.startsWith('(') && numbers.length > 0) {
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
  }

  // Otherwise return the raw numbers
  return numbers;
};

export const PixTransferScreen: React.FC<PixTransferProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formattedQuery, setFormattedQuery] = useState<string>('');
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isValidPixKey, setIsValidPixKey] = useState<boolean>(false);
  const labelRef = useRef<Animatable.Text>(null);
  const textInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { setup } = useSetup();

  // Monitor keyboard visibility
  useEffect(() => {
    function keyboardDidShow() {
      setKeyboardVisible(true);
      // Hide tab bar when keyboard is visible
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    }

    function keyboardDidHide() {
      setKeyboardVisible(false);
      // Show tab bar when keyboard is hidden
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    }

    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardDidShow
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();

      // Make sure tab bar is visible when component unmounts
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

  // Apply smart masking whenever searchQuery changes
  useEffect(() => {
    const formatted = applySmartMask(searchQuery);
    setFormattedQuery(formatted);

    // Simple validation - consider a key valid if it's at least 6 chars
    // This should be replaced with proper Pix key validation logic
    const isValid = searchQuery.trim().length >= 6;
    setIsValidPixKey(isValid);
  }, [searchQuery]);

  const handleFocus = () => {
    setKeyboardVisible(true); // Force keyboard visibility state when focus
    labelRef.current?.transitionTo({ translateY: -30, color: '#7b4e4e', fontSize: 15 }, 800);
  };

  const handleBlur = () => {
    if (searchQuery.length === 0) {
      labelRef.current?.transitionTo({ translateY: 0, color: 'grey', fontSize: 17 }, 300);
    }
  };

  const clearInput = () => {
    setSearchQuery('');
    setFormattedQuery('');
    setIsValidPixKey(false);
    textInputRef.current?.clear();
    labelRef.current?.transitionTo({ translateY: 0, color: 'grey', fontSize: 17 }, 300);
  };

  const handleTextChange = (value: string) => {
    // Store the raw input (with possible formatting)
    setSearchQuery(value);
  };

  const handleContinue = () => {
    if (isValidPixKey) {
      // Setup data with the entered Pix key/info
      // Remove formatting before sending for cleaner data
      const rawValue = searchQuery.replace(/[^\w@.-]/g, '');

      setup.setSetupData({
        ...setup,
        clientPix: rawValue,
      });
    }

    navigation.navigate('ValueScreen');
  };

  const renderContactItem = ({ item }: { item: any }) => (
    <ContactItem>
      <CircleAvatar>
        <InitialsText>{item.initials}</InitialsText>
      </CircleAvatar>
      <ContactName>{item.name}</ContactName>
    </ContactItem>
  );

  const navigateToCpfScreen = () => {
    navigation.navigate('CPFScreen');
  };

  const navigateToPhoneScreen = () => {
    navigation.navigate('PhoneScreen');
  };

  const navigateToQrCodeScreen = () => {
    // This would be implemented if you have a QR code scanner screen
    // navigation.navigate('QRCodeScreen');
  };

  const handleSeeAllContacts = () => {
    // Navigate to a full contacts screen if needed
    // navigation.navigate('AllContactsScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#BA261A" />
      <TopHeader height={insets.top} />
      <Header title="Pix" onPress={navigation.goBack} showBack={false} />

      <OuterContainer bounces={false}>
        <BaseText>Para quem você vai transferir?</BaseText>

        <InputContainer>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              textInputRef.current?.focus();
            }}>
            <Animatable.Text
              ref={labelRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 18,
                paddingLeft: 10,
                paddingRight: 10,
                paddingVertical: 2,
                color: 'grey',
                fontSize: 17,
                zIndex: 10,
                backgroundColor: 'white',
                borderRadius: 4,
              }}
              animation="fadeIn"
              duration={300}>
              Nome, Chave ou Pix copia e cola
            </Animatable.Text>
            <TextInput
              ref={textInputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                height: 56,
                fontSize: 16,
                color: '#000',
                paddingTop: 20,
                paddingHorizontal: 10,
              }}
              returnKeyType="search"
              keyboardAppearance="light"
              onChangeText={handleTextChange}
              value={formattedQuery}
            />
          </Pressable>
          {searchQuery.length > 0 && (
            <Pressable
              style={{
                padding: 8,
                position: 'absolute',
                right: 10,
                top: 14,
                zIndex: 20,
              }}
              onPress={clearInput}>
              <AntIcon name="close" size={22} color="#000" />
            </Pressable>
          )}
        </InputContainer>

        <Text style={{ paddingLeft: 20, color: '#777', marginTop: 5, marginBottom: 5 }}>
          Celular, CPF/CNPJ, e-mail, chave-aleatória...
        </Text>

        <ContactsContainer style={{ opacity: keyboardVisible ? 0.4 : 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <ContactsHeading>Contatos Recentes</ContactsHeading>
          </View>

          <ContactList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={mockContacts}
            renderItem={renderContactItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />

          <SeeAllButton
            onPress={handleSeeAllContacts}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              marginBottom: 5,
              paddingHorizontal: 15,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('@assets/icons/contacts.png')}
                style={{ width: 25, height: 25 }}
              />
              <SeeAllText style={{ fontSize: 18, marginLeft: 10 }}>Todos os contatos</SeeAllText>
            </View>
            <AntIcon name="right" size={14} color="#000" style={{ marginLeft: 15 }} />
          </SeeAllButton>
        </ContactsContainer>

        <OtherOptionsTitle>Você também pode usar</OtherOptionsTitle>

        <OtherOptionsContainer>
          <OtherOptionsItem onPress={navigateToCpfScreen}>
            <Image source={require('@assets/icons/bank.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Agência{'\n'}e conta</Text>
          </OtherOptionsItem>

          <OtherOptionsItem onPress={navigateToPhoneScreen}>
            <Image source={require('@assets/icons/copy.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Pix copia{'\n'}e cola</Text>
          </OtherOptionsItem>

          <OtherOptionsItem onPress={navigateToQrCodeScreen}>
            <Image source={require('@assets/icons/qrcode.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Código{'\n'}QR</Text>
          </OtherOptionsItem>
        </OtherOptionsContainer>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 19, fontWeight: '500', marginLeft: 15, marginBottom: 15 }}>
            Gerenciar
          </Text>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Image source={require('@assets/icons/keys.png')} style={{ width: 25, height: 25 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Minhas Chaves</Text>
              <Text style={{ color: '#777' }}>Cadastre e gerencie suas chaves Pix</Text>
            </View>
            <AntIcon name="right" size={20} color="#777" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Image
                source={require('@assets/icons/limits.png')}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Meus Limites</Text>
              <Text style={{ color: '#777' }}>Controle os limites das transferências</Text>
            </View>
            <AntIcon name="right" size={20} color="#777" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Image
                source={require('@assets/icons/extract.png')}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Extrato Pix</Text>
              <Text style={{ color: '#777' }}>Consulte o histórico das transações</Text>
            </View>
            <AntIcon name="right" size={20} color="#777" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Image
                source={require('@assets/icons/debit.png')}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Débito Automático via Pix</Text>
              <Text style={{ color: '#777' }}>Gerencie seus pagamentos automáticos</Text>
            </View>
            <AntIcon name="right" size={20} color="#777" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Image
                source={require('@assets/icons/booking.png')}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Agendamentos</Text>
              <Text style={{ color: '#777' }}>Consulte os pagamentos agendados</Text>
            </View>
            <AntIcon name="right" size={20} color="#777" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Image
                source={require('@assets/icons/repeat.png')}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Repetições programadas</Text>
              <Text style={{ color: '#777' }}>Consulte as repetições de transferências</Text>
            </View>
            <AntIcon name="right" size={20} color="#777" />
          </Pressable>
          <View style={{ height: 60 }} />
        </View>
      </OuterContainer>

      {/* Continue button at bottom of screen when keyboard is visible */}
      {keyboardVisible && (
        <View style={styles.continueButtonContainer}>
          <TouchableOpacity
            style={[styles.continueButton, !isValidPixKey && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!isValidPixKey}
            activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  continueButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    zIndex: 9999,
  },
  continueButton: {
    backgroundColor: '#cc0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PixTransferScreen;
