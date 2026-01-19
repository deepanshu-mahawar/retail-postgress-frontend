import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignupScreen = () => {
  const navigation = useNavigation<any>();

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (!user.fullname || !user.email || !user.password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://192.168.1.9:5000/api/auth/signup', user);

      Alert.alert('success', 'Signup successful');
      const email = user.email;
      setUser({ fullname: '', email: '', password: '' });
      navigation.navigate('Verification', {
        email,
      });
    } catch (error) {
      Alert.alert('Error', 'Signup failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={20} color="#000000a3" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join Retail Pro to manage your business efficiently.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#00000061" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="e.g. Alex Morgan"
            placeholderTextColor="#00000061"
            value={user.fullname}
            onChangeText={text => setUser({ ...user, fullname: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#00000061" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="name@example.com"
            placeholderTextColor="#00000061"
            keyboardType="email-address"
            autoCapitalize="none"
            value={user.email}
            onChangeText={text => setUser({ ...user, email: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#00000061" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#00000061"
            secureTextEntry={!isVisible}
            value={user.password}
            onChangeText={text => setUser({ ...user, password: text })}
          />
          <TouchableOpacity onPress={() => setIsVisible(prev => !prev)}>
            {isVisible ? (
              <Feather name="eye" size={20} color="black" />
            ) : (
              <Feather name="eye-off" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onSignup}>
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.terms}>Or continue with</Text>

      <View style={styles.extraButtonWrapper}>
        <TouchableOpacity style={styles.extraButton}>
          <FontAwesome name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraButton}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.terms}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('Signin')} style={styles.link}>
          Sign In
        </Text>
      </Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    backgroundColor: '#FFF5F0',
  },
  title: {
    fontSize: 32,
    marginTop: 45,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000a3',
    lineHeight: 20,
    marginTop: -6,
    marginBottom: 40,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000061',
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    height: 50,
    backgroundColor: '#ff5b27',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  terms: {
    fontSize: 13,
    color: '#000000a3',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  extraButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: 80,
    marginTop: 30,
  },
  extraButton: {
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderColor: '#00000016',
  },
  link: {
    color: '#ff5b27',
    fontWeight: '700',
  },
});
