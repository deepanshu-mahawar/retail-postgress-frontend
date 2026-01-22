import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
// import MainScreen from '../screens/MainScreen';
import Profile from '../screens/Profile';
import SigninScreen from '../screens/SigninScreen';
import BottomTabNavigator from './BottomTabNavigator';
import Product from '../screens/Product';
import Sell from '../screens/Sell';
import Inventory from '../screens/Inventory';


const Stack = createNativeStackNavigator();

export default function ProtectedNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          {/* <Stack.Screen name="Main" component={MainScreen} /> */}
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Inventory" component={Inventory} />
          <Stack.Screen name="Sell" component={Sell} />
          <Stack.Screen name="Product" component={Product} />
        </>
      ) : (
        <Stack.Screen name="Login" component={SigninScreen} />
      )}
    </Stack.Navigator>
  );
}
