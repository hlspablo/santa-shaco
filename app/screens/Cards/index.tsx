import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Header, Container, Spacer } from './styles';

export const CardsScreen = () => {
  const [cardsExpanded, setCardsExpanded] = useState(false);
  const [loansExpanded, setLoansExpanded] = useState(false);

  return (
    <Container>
      <Header>Cartões</Header>
      {/* Cards Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.accordion} onPress={() => setCardsExpanded(!cardsExpanded)}>
          <View style={styles.accordionHeader}>
            <View style={styles.iconContainer}>
              <Image
                resizeMode={Image.resizeMode.contain}
                source={require('@assets/icons/cards.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={styles.accordionTitle}>Meus cartões</Text>
          </View>
          <MaterialIcons
            name={cardsExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={28}
            color="#333"
          />
        </TouchableOpacity>

        {cardsExpanded && (
          <View style={styles.accordionContent}>
            <Text>Detalhes dos cartões aqui</Text>
          </View>
        )}
      </View>

      {/* Online Card Button - Outside the Meus cartões section */}
      <TouchableOpacity style={styles.onlineCardButton}>
        <Text style={styles.onlineCardText}>Cartão Online</Text>
      </TouchableOpacity>

      {/* Loans Section Header */}
      <Text style={styles.sectionTitle}>Empréstimos</Text>

      {/* Loans Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.accordion} onPress={() => setLoansExpanded(!loansExpanded)}>
          <View style={styles.accordionHeader}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="money-bill-wave" size={20} color="#333" />
            </View>
            <Text style={styles.accordionTitle}>Empréstimos</Text>
          </View>
          <MaterialIcons
            name={loansExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={28}
            color="#333"
          />
        </TouchableOpacity>

        {loansExpanded && (
          <View style={styles.accordionContent}>
            <Text>Detalhes de empréstimos aqui</Text>
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
  },
  accordionContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  onlineCardButton: {
    borderWidth: 1.5,
    borderColor: '#D74141',
    borderRadius: 6,
    padding: 18,
    marginVertical: 12,
    marginHorizontal: 0,
    alignItems: 'center',
  },
  onlineCardText: {
    color: '#D74141',
    fontSize: 18,
    fontWeight: '400',
  },
  simulateText: {
    color: '#777',
    fontSize: 16,
    marginTop: 8,
    marginLeft: 16,
    fontWeight: '400',
  },
});

export default CardsScreen;
