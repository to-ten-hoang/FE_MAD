import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { removeToken } from '../../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const LogoutModal = ({ onClose }: { onClose: () => void }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      // Xóa token khỏi AsyncStorage
      await removeToken();
      // Đóng modal
      onClose();
      // Điều hướng về màn hình đăng nhập
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Đăng xuất</Text>
          <Text style={styles.text}>Bạn có chắc chắn muốn rời đi không?</Text>

          <TouchableOpacity style={styles.confirm} onPress={handleLogout}>
            <Text style={styles.confirmText}>Có</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  confirm: {
    backgroundColor: '#1e0eff',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancel: {
    marginTop: 10,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
  },
  cancelText: {
    textAlign: 'center',
    color: '#666',
  },
});