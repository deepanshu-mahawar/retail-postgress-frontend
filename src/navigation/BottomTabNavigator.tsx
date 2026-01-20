import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Inventory" component={MainScreen} />
      <Tab.Screen name="Center" component={MainScreen} />
      <Tab.Screen name="Sell" component={MainScreen} />
      <Tab.Screen name="Profile" component={MainScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
