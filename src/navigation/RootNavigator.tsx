import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import VerificationScreen from '../screens/VerificationScreen';

import BottomTabNavigator from './BottomTabNavigator';
import Product from '../screens/Product';
import Profile from '../screens/Profile';
import Inventory from '../screens/Inventory';
import Sell from '../screens/Sell';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />

        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="Sell" component={Sell} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
