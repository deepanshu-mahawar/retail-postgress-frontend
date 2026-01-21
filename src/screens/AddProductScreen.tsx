import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddProductScreen = () => {
  const [step, setStep] = useState(1);
 const navigation = useNavigation<any>();

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    price: '',
    color: '',
    size: '',
    category: '',
  });

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-ios" size={20} color="#000000a3" />
              </TouchableOpacity>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add New Product</Text>
          <Text style={styles.headerSub}>Step {step} of 5</Text>
        </View>

        {/* STEP 1 – OPEN CAMERA */}
        {step === 1 && (
          <View style={styles.card}>
            <Ionicons name="camera-outline" size={40} color="#ff5b27" />
            <Text style={styles.cardTitle}>Open Camera</Text>
            <Text style={styles.cardText}>
              Use your camera to scan a barcode, label, or product text.
            </Text>

            <TouchableOpacity style={styles.primaryBtn} onPress={nextStep}>
              <Text style={styles.primaryBtnText}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2 – SCAN PRODUCT */}
        {step === 2 && (
          <View style={styles.card}>
            <Ionicons name="scan-outline" size={40} color="#ff5b27" />
            <Text style={styles.cardTitle}>Scanning Product</Text>
            <Text style={styles.cardText}>
              Identifying barcode / text using vision engine...
            </Text>

            {/* MOCK RESULT */}
            <View style={styles.mockBox}>
              <Text style={styles.mockText}>Detected: Cotton T-Shirt</Text>
              <Text style={styles.mockSub}>SKU: AUTO-1042</Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={nextStep}>
              <Text style={styles.primaryBtnText}>Confirm Detection</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 3 – LABEL PRODUCT */}
        {step === 3 && (
          <View style={styles.card}>
            <Ionicons name="pricetag-outline" size={40} color="#ff5b27" />
            <Text style={styles.cardTitle}>Label Product</Text>

            <TextInput
              placeholder="Product Name"
              style={styles.input}
              value={product.name}
              onChangeText={text => setProduct({ ...product, name: text })}
            />

            <TextInput
              placeholder="Category (e.g. Clothing)"
              style={styles.input}
              value={product.category}
              onChangeText={text => setProduct({ ...product, category: text })}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={nextStep}>
              <Text style={styles.primaryBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 4 – ADD DETAILS */}
        {step === 4 && (
          <View style={styles.card}>
            <Ionicons name="list-outline" size={40} color="#ff5b27" />
            <Text style={styles.cardTitle}>Product Details</Text>

            <TextInput
              placeholder="SKU"
              style={styles.input}
              value={product.sku}
              onChangeText={text => setProduct({ ...product, sku: text })}
            />

            <TextInput
              placeholder="Price"
              style={styles.input}
              keyboardType="numeric"
              value={product.price}
              onChangeText={text => setProduct({ ...product, price: text })}
            />

            <TextInput
              placeholder="Color"
              style={styles.input}
              value={product.color}
              onChangeText={text => setProduct({ ...product, color: text })}
            />

            <TextInput
              placeholder="Size"
              style={styles.input}
              value={product.size}
              onChangeText={text => setProduct({ ...product, size: text })}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={nextStep}>
              <Text style={styles.primaryBtnText}>Review</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 5 – SAVE */}
        {step === 5 && (
          <View style={styles.card}>
            <Ionicons
              name="checkmark-circle-outline"
              size={42}
              color="#16a34a"
            />
            <Text style={styles.cardTitle}>Ready to Save</Text>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>Name: {product.name}</Text>
              <Text style={styles.summaryText}>SKU: {product.sku}</Text>
              <Text style={styles.summaryText}>Price: ${product.price}</Text>
              <Text style={styles.summaryText}>Color: {product.color}</Text>
              <Text style={styles.summaryText}>Size: {product.size}</Text>
            </View>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save to Inventory</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  header: {
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  headerSub: {
    color: '#000000a3',
    fontSize: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#fff',
  },
  mockBox: {
    marginTop: 16,
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 10,
  },
  mockText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#9A3412',
  },
  mockSub: {
    fontSize: 12,
    color: '#9A3412',
  },
  summaryBox: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 13,
    marginBottom: 4,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 10,
  },
  saveBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});
