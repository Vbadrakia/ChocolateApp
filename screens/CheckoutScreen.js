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
    const orderData = {
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
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      Cart.clearCart();
      navigation.replace('OrderConfirmation', { orderId: docRef.id, totalPrice: orderData.totalPrice });
    } catch (error) {
      Alert.alert("Error", "Could not place order. Please try again.");
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
      {loading ? <ActivityIndicator size="large" /> : <Button title="Place Order (Cash on Delivery)" onPress={handlePlaceOrder} color="#622A0F" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5EFEA' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default CheckoutScreen;

