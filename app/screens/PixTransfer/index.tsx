import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  BaseText,
  ButtonContainer,
  CircleAvatar,
  ContactContainer,
  ContactItem,
  ContactList,
  ContactName,
  ContactsContainer,
  ContactsHeading,
  Divider,
  InitialsText,
  InputContainer,
  Label,
  OtherOptionsContainer,
  OtherOptionsItem,
  OtherOptionsTitle,
  OuterContainer,
  SearchInput,
  SeeAllButton,
  SeeAllText,
  TopHeader,
} from './styles';

import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import Header from '@/components/Header';
import { useSetup } from '@/store/hooks';

// Mock contacts data
const mockContacts = [
  { id: '1', name: 'Caio', initials: 'CF' },
  { id: '2', name: 'Pablo', initials: 'PS' },
  { id: '3', name: 'Jonathan', initials: 'JS' },
  { id: '4', name: 'Selma', initials: 'SR' },
  { id: '5', name: 'Yan', initials: 'YS' },
  { id: '6', name: 'Pedro', initials: 'PS' },
  { id: '7', name: 'Roger', initials: 'RG' },
];

export interface PixTransferProps {
  navigation?: any;
}

export const PixTransferScreen: React.FC<PixTransferProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const labelRef = useRef(null);
  const textInputRef = useRef(null);
  const { setup } = useSetup();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handleFocus = () => {
    labelRef.current?.transitionTo({ translateY: -20, color: '#7b4e4e', fontSize: 15 }, 800);
  };

  const handleBlur = () => {
    if (searchQuery.length === 0) {
      labelRef.current?.transitionTo({ translateY: 0, color: 'grey', fontSize: 17 }, 300);
    }
  };

  const clearInput = () => {
    setSearchQuery('');
    textInputRef.current?.clear();
    labelRef.current?.transitionTo({ translateY: 0, color: 'grey', fontSize: 17 }, 300);
  };

  const handleContactPress = (contact: any) => {
    setup.setSetupData({
      ...setup,
      clientName: contact.name,
      clientPix: contact.id, // This would typically be the contact's PIX key
      clientCPF: '12345678901', // Mock CPF
      clientBank: 'Banco Santa',
    });
    navigation.navigate('ValueScreen');
  };

  const handleSeeAllContacts = () => {
    // Navigate to a full contacts screen if needed
    // navigation.navigate('AllContactsScreen');
  };

  const renderContactItem = ({ item }: { item: any }) => (
    <ContactItem onPress={() => handleContactPress(item)}>
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

  return (
    <OuterContainer bounces={false}>
      <TopHeader height={insets.top} />
      <Header title="Pix" onPress={navigation.goBack} />

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
              color: 'grey',
              fontSize: 17,
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
            onChangeText={(value) => setSearchQuery(value)}
            value={searchQuery}
          />
        </Pressable>
        {searchQuery.length > 0 && (
          <Pressable
            style={{
              padding: 8,
              position: 'absolute',
              right: 5,
              top: 12,
            }}
            onPress={clearInput}>
            <AntIcon name="close" size={24} color="#ec0200" />
          </Pressable>
        )}
      </InputContainer>

      <Text style={{ paddingLeft: 15, color: '#777', marginTop: 5, marginBottom: 5 }}>
        Celular, CPF/CNPJ, e-mail, chave-aleatória...
      </Text>

      <ContactsContainer>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <ContactsHeading>Contatos Recentes</ContactsHeading>
          <SeeAllButton onPress={handleSeeAllContacts}>
            <SeeAllText>Todos os contatos</SeeAllText>
            <AntIcon name="right" size={14} color="#000" />
          </SeeAllButton>
        </View>

        <ContactList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mockContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </ContactsContainer>

      <OtherOptionsTitle>Você também pode usar</OtherOptionsTitle>

      <OtherOptionsContainer>
        <OtherOptionsItem onPress={navigateToCpfScreen}>
          <FontAwesome name="bank" size={40} color="#ba261a" />
          <Text style={{ textAlign: 'center', marginTop: 10 }}>Agência{'\n'}e conta</Text>
        </OtherOptionsItem>

        <OtherOptionsItem onPress={navigateToPhoneScreen}>
          <AntIcon name="copy1" size={40} color="#ba261a" />
          <Text style={{ textAlign: 'center', marginTop: 10 }}>Pix copia{'\n'}e cola</Text>
        </OtherOptionsItem>

        <OtherOptionsItem onPress={navigateToQrCodeScreen}>
          <AntIcon name="qrcode" size={40} color="#ba261a" />
          <Text style={{ textAlign: 'center', marginTop: 10 }}>Código{'\n'}QR</Text>
        </OtherOptionsItem>
      </OtherOptionsContainer>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15, marginBottom: 15 }}>
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
            <FontAwesome name="key" size={24} color="#ba261a" />
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
            <FontAwesome name="sliders" size={24} color="#ba261a" />
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
            <FontAwesome name="file-text-o" size={24} color="#ba261a" />
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
            <FontAwesome name="calendar" size={24} color="#ba261a" />
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
            <FontAwesome name="calendar" size={24} color="#ba261a" />
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
            <FontAwesome name="refresh" size={24} color="#ba261a" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Repetições programadas</Text>
            <Text style={{ color: '#777' }}>Consulte as repetições de transferências</Text>
          </View>
          <AntIcon name="right" size={20} color="#777" />
        </Pressable>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 30,
            marginLeft: 15,
            marginBottom: 15,
          }}>
          Mais opções
        </Text>

        <View style={{ height: 60 }} />
      </View>
    </OuterContainer>
  );
};

export default PixTransferScreen;
