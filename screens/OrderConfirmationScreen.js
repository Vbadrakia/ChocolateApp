import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderId, totalPrice } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thank You!</Text>
      <Text style={styles.message}>Your order has been placed successfully.</Text>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Order ID: {orderId.substring(0, 10)}...</Text>
        <Text style={styles.summaryText}>Total Amount: ${totalPrice.toFixed(2)}</Text>
        <Text style={styles.deliveryText}>Estimated delivery in 2-3 business days.</Text>
      </View>
      <Button title="Continue Shopping" onPress={() => navigation.navigate('ProductList')} color="#622A0F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F5EFEA' },
  header: { fontSize: 32, fontWeight: 'bold', color: '#622A0F', marginBottom: 10 },
  message: { fontSize: 18, textAlign: 'center', marginBottom: 30 },
  summaryBox: { backgroundColor: 'white', padding: 20, borderRadius: 8, marginBottom: 40, width: '100%', elevation: 2 },
  summaryText: { fontSize: 16, marginBottom: 8 },
  deliveryText: { fontSize: 16, marginTop: 15, fontWeight: 'bold', color: '#8D4925' },
});

export default OrderConfirmationScreen;

