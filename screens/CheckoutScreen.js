import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Cart } from '../utils/Cart';

const CheckoutScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!name || !address || !phone) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    const order = {
      userId: auth.currentUser.uid,
      customerName: name,
      shippingAddress: address,
      phone: phone,
      items: Cart.getItems(),
      totalPrice: Cart.getTotal(),
      status: 'Pending',
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      Alert.alert("Success", "Your order has been placed!", [
        { text: "OK", onPress: () => {
          Cart.clearCart();
          navigation.popToTop(); // Go back to the top of the stack (ProductList)
        }}
      ]);
    } catch (error) {
      Alert.alert("Error", "Could not place order. Please try again.");
      console.error("Error placing order: ", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipping Information</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Shipping Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Place Order (Cash on Delivery)" onPress={handlePlaceOrder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default CheckoutScreen;

