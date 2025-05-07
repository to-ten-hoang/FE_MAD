import axios from 'axios';

const BASE_URL = 'https://server-mad.onrender.com';

// Đăng nhập
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, null, {
      params: { email, password },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin hồ sơ người dùng
export const getUserProfile = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};