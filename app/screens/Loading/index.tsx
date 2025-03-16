import { ActivityIndicator, Modal, View } from 'react-native';

export const LoadingComponent = () => {
  return (
    <Modal visible={false} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <ActivityIndicator size="large" color="#D74141" />
      </View>
    </Modal>
  );
};
