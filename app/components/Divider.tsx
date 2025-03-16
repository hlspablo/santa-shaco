import { View, StyleSheet } from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1, // You can set the height
    backgroundColor: '#D1D1D1', // You can set the background color
    marginVertical: 10, // Optional margins
  },
});

export default Divider;
