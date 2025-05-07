import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LogoutModal from './LogoutModal';
import { getUserId } from '../../utils/storage';
import { getUserProfile } from '../../api/authApi';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [showLogout, setShowLogout] = useState(false);
  const [userName, setUserName] = useState(''); // State để lưu tên người dùng

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = await getUserId();
        if (userId) {
          const userProfile = await getUserProfile(userId);
          setUserName(userProfile.fullName || ''); // Lấy fullName từ API
        } else {
          // Nếu không có userId, có thể điều hướng về Login
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        {/* Header Cover */}
        <View style={styles.headerCover}>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.avatar} />
          <Text style={styles.name}>{userName || <ActivityIndicator size="small" color="#fff" />}</Text>
          <Text style={styles.location}>California, USA</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="pencil" size={14} color="#fff" />
            <Text style={styles.editText}>Chỉnh sửa thông tin cá nhân</Text>
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          <MenuItem icon="notifications-outline" title="Cài đặt thông báo" onPress={() => navigation.navigate('NotificationSettings')} />
          <MenuItem icon="lock-closed-outline" title="Đổi mật khẩu" />
          <MenuItem icon="document-text-outline" title="Điều khoản dịch vụ" />
          <MenuItem icon="briefcase-outline" title="Chính sách lao động" />
          <MenuItem icon="shield-checkmark-outline" title="Cài đặt bảo mật" />
          <MenuItem icon="help-circle-outline" title="Trợ giúp" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogout(true)}>
          <Ionicons name="log-out-outline" size={20} color="#e15a4f" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={20} color="#7b5cff" style={{ marginRight: 10 }} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  // Header cover with reduced height and better color
  headerCover: {
    backgroundColor: '#7b5cff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    fontSize: 13,
    color: '#eee',
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 13,
  },

  // Menu list
  menu: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#f5f6f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },

  // Logout button
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe8e6',
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 30,
  },
  logoutText: {
    color: '#e15a4f',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});