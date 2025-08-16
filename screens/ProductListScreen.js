import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { Cart } from '../utils/Cart';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsCollection = collection(db, 'products');
    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
          {auth.currentUser?.email === 'admin@example.com' && (
            <View style={{ marginLeft: 10 }}>
                <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
            </View>
          )}
        </View>
      ),
    });
  }, [navigation]);

  const addToCart = (product) => {
    Cart.addItem(product);
    Alert.alert('Success', `${product.name} has been added to your cart.`);
  };

  const renderItem = ({ item }) => (
    <View style={productStyles.card}>
      <Image source={{ uri: item.imageUrl }} style={productStyles.image} />
      <View style={productStyles.infoContainer}>
        <Text style={productStyles.name}>{item.name}</Text>
        <Text style={productStyles.description}>{item.description}</Text>
        <Text style={productStyles.price}>${item.price.toFixed(2)}</Text>
        <Button title="Add to Cart" onPress={() => addToCart(item)} />
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
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
  container: { padding: 10 },
  card: { backgroundColor: 'white', borderRadius: 8, marginBottom: 15, elevation: 3, overflow: 'hidden' },
  image: { width: '100%', height: 200 },
  infoContainer: { padding: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  description: { color: 'gray', marginVertical: 5 },
  price: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
});

export default ProductListScreen;

