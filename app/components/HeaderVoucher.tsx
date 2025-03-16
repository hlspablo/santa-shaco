import { View, StyleSheet, Text } from 'react-native';
import Image from 'react-native-fast-image';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
interface HeaderProps {
  title: string;
}
export const HeaderVoucher = ({ title }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <AntIcon name="close" size={32} color="#ec0200" />
      <Image
        source={require('@assets/pages/voucher/logo2.png')}
        resizeMode={Image.resizeMode.contain}
        style={{ width: '45%', height: 28 }}
      />
      <AntIcon name="sharealt" size={28} color="#ec0200" />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fefefe',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
