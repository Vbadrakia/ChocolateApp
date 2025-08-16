import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Cart } from '../utils/Cart';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(Cart.getItems());
  const [total, setTotal] = useState(Cart.getTotal());

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCartItems([...Cart.getItems()]); // Use spread to ensure re-render
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
        <View style={cartStyles.emptyContainer}>
            <Text>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.product.id}
          />
          <View style={cartStyles.footer}>
            <Text style={cartStyles.total}>Total: ${total.toFixed(2)}</Text>
            <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
          </View>
        </>
      )}
    </View>
  );
};

const cartStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: '600' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: 'white' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' },
});

export default CartScreen;

