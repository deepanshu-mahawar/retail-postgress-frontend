import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { User } from '../types/type';

const MainScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getProfile = async () => {
      const token = await AsyncStorage.getItem('authToken');
      try {
        const response = await axios.get(
          'http://192.168.1.9:5000/api/auth/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUser(response.data.user);
      } catch (error) {
        console.log('error', error);
      }
    };

    getProfile();
  }, []);

  return (
    <View>
      <Text>{user?.id}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.username}</Text>
    </View>
  );
};

export default MainScreen;
