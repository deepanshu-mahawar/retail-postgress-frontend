import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';

const categories = [
  { label: 'Select category', value: '' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Fresh Items', value: 'fresh' },
  { label: 'Personalcare', value: 'personal' },
  { label: 'Household', value: 'home' },
  { label: 'Babycare', value: 'baby' },
  { label: 'Healthcare', value: 'health' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Stationery', value: 'stationery' },
];

const Product = () => {
  const navigation = useNavigation<any>();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: null as any,
  });

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && response.assets?.length) {
          setProduct({
            ...product,
            image: response.assets[0],
          });
        }
      },
    );
  };



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={20} color="#000000a3" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Product</Text>
      <Text style={styles.subtitle}>Add product details to start selling.</Text>

      <TouchableOpacity style={styles.card} onPress={pickImage}>
        {product.image ? (
          <Image
            source={{ uri: product.image.uri }}
            style={styles.previewImage}
          />
        ) : (
          <>
            <Ionicons name="camera-outline" size={40} color="#ff5b27" />
            <Text style={styles.cardTitle}>Upload Product Image</Text>
            <Text style={styles.cardText}>
              Tap to select an image from gallery
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrapper}>
          <Feather name="box" size={20} color="#00000061" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="e.g. Parle-G"
            placeholderTextColor="#00000061"
            value={product.name}
            onChangeText={text => setProduct({ ...product, name: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="currency-rupee"
            size={20}
            color="#00000061"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="200"
            placeholderTextColor="#00000061"
            autoCapitalize="none"
            value={product.price}
            onChangeText={number => setProduct({ ...product, price: number })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Stock</Text>
        <View style={styles.inputWrapper}>
          <Feather
            name="grid"
            size={20}
            color="#00000061"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="20"
            placeholderTextColor="#00000061"
            autoCapitalize="none"
            value={product.stock}
            onChangeText={number => setProduct({ ...product, stock: number })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>

        <View style={styles.categoryRow}>
          {categories.slice(1).map(item => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.categoryChip,
                product.category === item.value && styles.categoryChipActive,
              ]}
              onPress={() => setProduct({ ...product, category: item.value })}
            >
              <Text
                style={[
                  styles.categoryText,
                  product.category === item.value && styles.categoryTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
          <TextInput
            style={styles.textArea}
            placeholder="Write product description..."
            placeholderTextColor="#00000061"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={product.description}
            onChangeText={text => setProduct({ ...product, description: text })}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Product</Text>
      </TouchableOpacity>

      <View style={styles.screenView}/>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
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
    marginBottom: 20,
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
  card: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginBottom: 16,
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 12,
  },
  cardText: {
    fontSize: 13,
    color: '#000000a3',
    textAlign: 'center',
    marginTop: 6,
  },
  primaryBtn: {
    marginTop: 20,
    backgroundColor: '#ff5b27',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  previewImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },

  textAreaWrapper: {
    height: 120,
    alignItems: 'flex-start',
  },

  textArea: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00000061',
  },

  categoryChipActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },

  categoryText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },

  categoryTextActive: {
    color: '#fff',
  },
  screenView: {
    height: 160,
  },
});
