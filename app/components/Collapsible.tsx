import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Image from 'react-native-fast-image';
import { Shadow } from 'react-native-shadow-2';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import Divider from './Divider';

import { formatCurrency } from '@/utils/format';

interface CollapsibleRectangleProps {
  isOpen: boolean;
  toggleRectangle: () => void;
  shouldAnimate: boolean;
  balance: number;
}

export const CollapsibleRectangle = ({
  isOpen,
  shouldAnimate,
  toggleRectangle,
  balance,
}: CollapsibleRectangleProps) => {
  const containerStyle = isOpen
    ? { ...styles.container, overflow: 'visible' as any }
    : styles.container;

  return (
    <View style={styles.wrapper}>
      <Shadow style={containerStyle} stretch>
        <Pressable onPress={toggleRectangle}>
          <View style={styles.rectangle}>
            <View style={styles.mainRow}>
              <View style={styles.row}>
                <Image
                  source={require('@assets/pages/main/icon.png')}
                  resizeMode={Image.resizeMode.cover}
                  style={{ width: 32, height: 32, backgroundColor: '#BA261A' }}
                />
                <Text style={styles.mainText}>Saldo disponível</Text>
              </View>
              <Animatable.View
                animation={
                  shouldAnimate
                    ? {
                        0: { transform: [{ rotate: isOpen ? '0deg' : '180deg' }] },
                        1: { transform: [{ rotate: isOpen ? '180deg' : '0deg' }] },
                      }
                    : undefined
                }
                duration={350}>
                <SimpleLineIcon name="arrow-down" size={22} color="#000" />
              </Animatable.View>
            </View>

            <Animatable.View
              style={styles.collapsibleContent}
              animation={
                shouldAnimate
                  ? {
                      from: { height: isOpen ? 0 : 170 },
                      to: { height: isOpen ? 170 : 0 },
                    }
                  : undefined
              }
              duration={350}>
              <View style={styles.coverShadow} />
              <View style={styles.contentContainer}>
                <Text style={styles.mainAmountText}>{formatCurrency(balance)}</Text>
                <Text style={styles.amountText}>Saldo + Limite: {formatCurrency(balance)}</Text>
                <Text style={styles.understandText}>Entenda seu limite</Text>
                <View style={styles.bottomView}>
                  <Divider />
                  <Text style={styles.extractText}>Ver extrato</Text>
                </View>
              </View>
            </Animatable.View>
          </View>
        </Pressable>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  coverShadow: {
    position: 'absolute',
    height: 10,
    backgroundColor: '#fff',
    width: '100%',
    top: -6,
    zIndex: 10,
  },
  wrapper: {
    marginHorizontal: 20,
  },
  extractText: {
    color: '#BA261A',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomView: {
    marginTop: 6,
    justifyContent: 'center',
  },
  understandText: {
    color: '#BA261A',
    marginTop: 6,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  amountText: {
    marginTop: 6,
    fontSize: 17,
    color: '#000',
  },
  mainAmountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    zIndex: 1, // Lower zIndex than coverShadow
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    marginLeft: 12,
    fontSize: 20,
    color: '#000',
  },
  container: {
    flexDirection: 'column',
    overflow: 'hidden',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    height: 65,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: '#fff',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  rectangle: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 65,
    backgroundColor: '#fff',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  collapsibleContent: {
    height: 0,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    backgroundColor: '#fff',
    elevation: 5,
  },
});
