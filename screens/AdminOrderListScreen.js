import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const AdminOrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.bold}>Order ID: {item.id.substring(0, 8)}...</Text>
      <Text>Customer: {item.customerName}</Text>
      <Text>Address: {item.shippingAddress}</Text>
      <Text>Total: ${item.totalPrice.toFixed(2)}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  bold: { fontWeight: 'bold' },
});

export default AdminOrderListScreen;

