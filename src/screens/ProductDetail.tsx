import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const ProductDetail = () => {
  const route = useRoute<any>();
  const { id } = route.params;
  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Image />
        </View>
        <View>
          <View>
            <Text>Name</Text>
            <View>
              <Text>Category</Text>
            </View>
          </View>
          <View>
            <Text>Stock</Text>
            <View>Increase/Decrease</View>
          </View>
          <View>
            <Text>Des</Text>
            <Text>...........</Text>
          </View>
          <View>
            <Text>Price</Text>
            <TouchableOpacity>Add to Cart</TouchableOpacity>
          </View>
        </View>
      </View>
      <Text>{id}</Text>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    padding: 10,
  },
});
