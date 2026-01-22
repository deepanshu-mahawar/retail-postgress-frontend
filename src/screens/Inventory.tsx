// import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { Product } from '../types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
  const [selectedCategory, setSelectedCategory] = useState('');

  const [products, setProducts] = useState<Product[] | null>(null);

  // const navigation = useNavigation<any>();

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
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.headerTitle}>Inventory</Text>
        </View>

        <View style={styles.headerRight}>
          <Feather name="search" size={22} color="#000000a3" />
          <Feather name="shopping-cart" size={24} color="#ff5b27" />
        </View>
      </SafeAreaView>

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
        {products?.map(product => (
          <View key={product?.id} style={styles.productCard}>
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
                  <Feather name="plus" size={20} color="#ff5b27" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
  },
  productImageContainer: {
    alignItems: 'center',
    backgroundColor: '#ffe3d9',
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productContentContainer: {},
  productName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  productcategory: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000a3',
    marginTop: -4,
  },
  productSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  addButton: {
    backgroundColor: '#ffe3d9',
    padding: 8,
    borderRadius: 30,
  },
});
