import { StyleSheet, Text, Pressable } from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

interface HeaderProps {
  title: string;
  onPress?: () => void;
  showClose?: boolean;
  showBack?: boolean;
}
const Header = ({ title, showClose, showBack = true, onPress }: HeaderProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {showClose ? (
        <EvilIcon style={styles.icon} name="close" size={35} color="#fff" />
      ) : (
        showBack && <Icon style={styles.icon} name="arrow-left" size={22} color="#fff" />
      )}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#BA261A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
