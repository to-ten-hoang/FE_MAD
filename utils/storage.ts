import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu token
export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Lấy token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Xóa token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId'); // Xóa userId khi đăng xuất
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Lưu userId
export const storeUserId = async (userId: number) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
  } catch (error) {
    console.error('Error storing userId:', error);
  }
};

// Lấy userId
export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  } catch (error) {
    console.error('Error retrieving userId:', error);
    return null;
  }
};