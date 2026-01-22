import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { Product } from '../types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { label: 'All', value: '' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Fresh', value: 'fresh' },
  { label: 'Personal', value: 'personal' },
  { label: 'Household', value: 'home' },
  { label: 'Babycare', value: 'baby' },
  { label: 'Healthcare', value: 'health' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Stationery', value: 'stationery' },
];

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const getProducts = async () => {
      const token = await AsyncStorage.getItem('authToken');
      try {
        const response = await axios.get(
          'http://192.168.1.3:5000/api/product/get-products',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setProducts(response.data.data);
        console.log('response', response.data.data);
      } catch (error) {
        console.log('Fetch products failed', error);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.headerTitle}>Inventory</Text>
        </View>

        <View style={styles.headerRight}>
          <Feather
            name="search"
            size={22}
            color="#000000a3"
            onPress={() => setIsVisible(prev => !prev)}
          />
          <Ionicons name="cart-outline" size={26} color="#ff5b27" />
        </View>
      </SafeAreaView>

      {isVisible && (
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={22}
            color="#000000a3"
            onPress={() => setIsVisible(prev => !prev)}
          />
          <TextInput
            style={styles.searchText}
            placeholder="Search for products"
            placeholderTextColor="#00000061"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item.value;

          return (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item.value)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.categoryTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.gridContainer}>
        {filteredProducts?.map(product => (
          <Pressable
            key={product?.id}
            style={styles.productCard}
            onPress={() =>
              navigation.navigate('ProductDetail', { id: product.id })
            }
          >
            <EvilIcons
              name="heart"
              size={22}
              color="#000000a3"
              style={styles.like}
            />
            <View style={styles.productImageContainer}>
              <Image
                style={styles.productImage}
                source={{
                  uri: `http://192.168.1.3:5000${product.image}`,
                }}
              />
            </View>
            <View style={styles.productContentContainer}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productcategory}>{product.category}</Text>
              <View style={styles.productSubContainer}>
                <Text style={styles.productPrice}>₹{product.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="cart-outline" size={20} color="#ff5b27" />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.extraSpace} />
    </ScrollView>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  categoryChipActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },
  categoryText: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  productCard: {
    backgroundColor: '#ffffff',
    width: '48%',
    borderRadius: 12,
    padding: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    gap: 10,
    marginTop: 16,
    position: 'relative',
  },
  productImageContainer: {
    alignItems: 'center',
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 168,
    resizeMode: 'center',
    borderRadius: 10,
  },
  productContentContainer: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  productcategory: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000a3',
    marginTop: -2,
  },
  productSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  addButton: {
    backgroundColor: '#FFF5F0',
    padding: 10,
    borderRadius: 30,
  },
  searchContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000000a3',
  },
  like: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 999,
  },
  extraSpace: {
    paddingBottom: 150,
  },
});
