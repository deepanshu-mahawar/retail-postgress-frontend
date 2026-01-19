import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Intro');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name="cart-shopping" color={'white'} size={44} />
      </View>
      <Text style={styles.title}>Retail Pro</Text>
      <Text style={styles.subtitle} numberOfLines={3}>
        Manage inventory, tract sales, and grow your retail business in one
        place.
      </Text>

      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#ff5927fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginTop: -8,
    fontSize: 14,
    color: '#000000a3',
    letterSpacing: 0.5,
    maxWidth: '85%',
    lineHeight: 20,
  },
});
