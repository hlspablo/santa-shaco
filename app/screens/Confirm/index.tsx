import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import { TopHeader } from './styles';

import { ConfirmScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import { useSetup } from '@/store/hooks';
import {
  addDashBeforeLast,
  detectAndMask,
  formatCurrency,
  formatToday,
  maskCPF,
} from '@/utils/format';

export const ConfirmScreen = function () {
  const [saveContact, setSaveContact] = useState(false);
  const [repeatPix, setRepeatPix] = useState(false);

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
  } = useSetup();

  function confirmTransaction() {
    withdraw();
    navigation.navigate('SuccessScreen');
  }

  return (
    <View style={styles.container}>
      <TopHeader height={insets.top} />
      <Header title="Revisão" onPress={navigation.goBack} redBackground />

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>Para finalizar, confirme os dados</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Para <Text style={styles.boldText}>{clientName}</Text>
          </Text>
          <Text style={styles.detailText}>CPF: {maskCPF(clientCPF)} - PICPAY</Text>
          <Text style={styles.detailText}>Chave: {detectAndMask(clientPix)}</Text>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setSaveContact(!saveContact)}
            activeOpacity={0.7}>
            <View style={[styles.checkbox, saveContact && styles.checkboxActive]}>
              {saveContact && <Icon name="check" size={14} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>Salvar contato</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Valor</Text>
          <Text style={styles.valueText}>R$ {transferValue.toFixed(2).replace('.', ',')}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Forma de pagamento</Text>
          <Text style={styles.detailText}>
            Ag {ownerAgency} Cc {addDashBeforeLast(ownerAccount)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Data de envio</Text>
          <Text style={styles.detailText}>Hoje - {formatToday()}</Text>
        </View>

        <View style={styles.boxSection}>
          <Text style={styles.boxTitle}>Facilite seus envios frequentes</Text>
          <Text style={styles.boxDescription}>
            Agora você pode programar repetições de transferências que você faz regularmente.
          </Text>

          <View style={styles.divider} />

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Repetir Pix</Text>
            <TouchableOpacity
              style={[styles.toggleButton, repeatPix && styles.toggleButtonActive]}
              onPress={() => setRepeatPix(!repeatPix)}
              activeOpacity={0.8}>
              <View style={[styles.toggleCircle, repeatPix && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Confira os dados acima antes de concluir a transação.
          </Text>
          <Text style={styles.warningSecondaryText}>
            Após a confirmação, a operação não poderá ser cancelada.
          </Text>
        </View>

        {/* Extra padding to ensure scrollability past the fixed button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={confirmTransaction}
          activeOpacity={0.9}>
          <Text style={styles.sendButtonText}>Enviar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#333',
    marginVertical: 12,
  },
  section: {
    marginVertical: 8,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  valueText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#cc0000',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#cc0000',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
  boxSection: {
    marginTop: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  boxDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    width: 55,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleButtonActive: {
    backgroundColor: '#999',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  warningContainer: {
    marginTop: 15,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 5,
  },
  warningText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 3,
  },
  warningSecondaryText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: '#fff',
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sendButton: {
    backgroundColor: '#cc0000',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
  },
});
