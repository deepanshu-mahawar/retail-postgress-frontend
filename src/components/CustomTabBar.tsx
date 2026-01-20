import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const CustomTabBar = ({ state, navigation }: any) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => navigation.navigate(route.name);

          if (route.name === 'Center') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.centerButton}
                activeOpacity={0.8}
              >
                <Feather name="plus" size={24} color="#fff" />
              </TouchableOpacity>
            );
          }

          let iconName = 'home-outline';
          if (route.name === 'Inventory') iconName = 'box';
          if (route.name === 'Sell') iconName = 'shopping-cart';
          if (route.name === 'Profile') iconName = 'person-outline';

          return (
            <TouchableOpacity key={index} onPress={onPress} style={styles.tab}>
              {route.name === 'Inventory' ? (
                <Feather
                  name="box"
                  size={22}
                  color={isFocused ? '#ff5b27' : '#00000061'}
                />
              ) : route.name === 'Sell' ? (
                <Feather
                  name="shopping-cart"
                  size={22}
                  color={isFocused ? '#ff5b27' : '#00000061'}
                />
              ) : (
                <Icon
                  name={iconName}
                  size={22}
                  color={isFocused ? '#ff5b27' : '#00000061'}
                />
              )}

              {isFocused && <Text style={styles.label}>{route.name}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 100,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#ff5b27',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  centerButton: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 25 : 120,
    alignSelf: 'center',
    backgroundColor: '#ff5b27',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff5b27',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
});
