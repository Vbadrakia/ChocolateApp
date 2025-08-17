import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Cart } from '../utils/Cart';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  const addToCart = () => {
    Cart.addItem(product);
    Alert.alert('Success', `${product.name} has been added to your cart.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <Text style={styles.ingredients}>{product.ingredients || 'Not specified'}</Text>
        <Button title="Add to Cart" onPress={addToCart} color="#622A0F" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  image: { width: '100%', height: 300 },
  detailsContainer: { padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#622A0F', marginBottom: 10 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#8D4925', marginBottom: 15 },
  description: { fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 20 },
  ingredientsTitle: { fontSize: 20, fontWeight: 'bold', color: '#622A0F', marginBottom: 5 },
  ingredients: { fontSize: 16, color: '#555', marginBottom: 30 },
});

export default ProductDetailScreen;


// ========================================================================
// File: screens/CartScreen.js
// ========================================================================
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Cart } from '../utils/Cart';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(Cart.getItems());
  const [total, setTotal] = useState(Cart.getTotal());

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCartItems([...Cart.getItems()]);
      setTotal(Cart.getTotal());
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={cartStyles.itemContainer}>
      <Text style={cartStyles.itemName}>{item.product.name} (x{item.quantity})</Text>
      <Text style={cartStyles.itemPrice}>${(item.product.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={cartStyles.container}>
      {cartItems.length === 0 ? (
        <View style={cartStyles.emptyContainer}><Text>Your cart is empty.</Text></View>
      ) : (
        <>
          <FlatList data={cartItems} renderItem={renderItem} keyExtractor={item => item.product.id} />
          <View style={cartStyles.footer}>
            <Text style={cartStyles.total}>Total: ${total.toFixed(2)}</Text>
            <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} color="#622A0F" />
          </View>
        </>
      )}
    </View>
  );
};

const cartStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5EFEA' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: '600' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: 'white' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' },
});

export default CartScreen;
