import React, { useContext } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { logout } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  logoutBtnText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
