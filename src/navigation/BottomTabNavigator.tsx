import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import CustomTabBar from '../components/CustomTabBar';
import Inventory from '../screens/Inventory';
import Product from '../screens/Product';
import Sell from '../screens/Sell';
import profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Inventory" component={Inventory} />
      <Tab.Screen name="Center" component={Product} />
      <Tab.Screen name="Sell" component={Sell} />
      <Tab.Screen name="Profile" component={profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;



// import React from 'react';
// import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import MainScreen from '../screens/MainScreen';

// const Tab = createBottomTabNavigator();

// const COLORS = {
//   active: '#ff5b27',
//   inactive: '#AEB7C2',
//   white: '#FFFFFF',
// };

// const ScanButton = ({ onPress }: { onPress?: () => void }) => (
//   <TouchableOpacity
//     activeOpacity={0.85}
//     onPress={onPress}
//     style={styles.scanButtonWrapper}
//   >
//     <View style={styles.scanButton}>
//       <Ionicons name="scan-outline" size={30} color={COLORS.white} />
//     </View>
//   </TouchableOpacity>
// );

// const TabIconWithLabel = ({
//   focused,
//   icon,
//   label,
//   iconSet = 'ion',
// }: any) => (
//   <View style={styles.iconContainer}>
//     {iconSet === 'ion' ? (
//       <Ionicons
//         name={icon}
//         size={24}
//         color={focused ? COLORS.active : COLORS.inactive}
//       />
//     ) : (
//       <Feather
//         name={icon}
//         size={24}
//         color={focused ? COLORS.active : COLORS.inactive}
//       />
//     )}
//     {focused && <Text style={styles.text}>{label}</Text>}
//   </View>
// );

// export default function BottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: styles.tabBar,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={MainScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabIconWithLabel
//               focused={focused}
//               icon="home-outline"
//               label="Home"
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Inventory"
//         component={MainScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabIconWithLabel
//               focused={focused}
//               icon="box"
//               label="Inventory"
//               iconSet="feather"
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Scan"
//         component={MainScreen}
//         options={{
//           tabBarButton: props => <ScanButton {...props} />,
//         }}
//       />

//       <Tab.Screen
//         name="Orders"
//         component={MainScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabIconWithLabel
//               focused={focused}
//               icon="shopping-cart"
//               label="Sell"
//               iconSet="feather"
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Settings"
//         component={MainScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabIconWithLabel
//               focused={focused}
//               icon="person-outline"
//               label="Profile"
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     height: 100,
//     backgroundColor: COLORS.white,
//     borderTopWidth: 0,
//     elevation: 10,
//   },

//   iconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 70,
//     top: 26,
//   },

//   scanButtonWrapper: {
//     top: -30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   scanButton: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: COLORS.active,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 10,
//   },

//   text: {
//     marginTop: 6,
//     color: COLORS.active,
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//   },
// });
