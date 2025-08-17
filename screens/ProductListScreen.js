import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { Cart } from '../utils/Cart';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsCollection = collection(db, 'products');
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <Button title="My Orders" onPress={() => navigation.navigate('Profile')} color="#fff" />
          <View style={{ marginLeft: 10 }}><Button title="Cart" onPress={() => navigation.navigate('Cart')} color="#fff" /></View>
          {auth.currentUser?.email === 'admin@example.com' && (
            <View style={{ marginLeft: 10 }}><Button title="Admin" onPress={() => navigation.navigate('Admin')} color="#fff" /></View>
          )}
        </View>
      ),
      headerLeft: null,
    });
  }, [navigation]);

  const addToCart = (product) => {
    Cart.addItem(product);
    Alert.alert('Success', `${product.name} has been added to your cart.`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <View style={productStyles.card}>
        <Image source={{ uri: item.imageUrl }} style={productStyles.image} />
        <View style={productStyles.infoContainer}>
          <Text style={productStyles.name}>{item.name}</Text>
          <Text style={productStyles.description} numberOfLines={2}>{item.description}</Text>
          <Text style={productStyles.price}>${item.price.toFixed(2)}</Text>
          <Button title="Add to Cart" onPress={() => addToCart(item)} color="#622A0F" />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, backgroundColor: '#F5EFEA' }} />;
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={productStyles.container}
    />
  );
};

const productStyles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#F5EFEA' },
  card: { backgroundColor: 'white', borderRadius: 8, marginBottom: 15, elevation: 3, overflow: 'hidden' },
  image: { width: '100%', height: 200 },
  infoContainer: { padding: 15 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#622A0F' },
  description: { color: 'gray', marginVertical: 5 },
  price: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#8D4925' },
});

export default ProductListScreen;

