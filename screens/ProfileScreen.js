import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const ProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, 'orders'), 
      where("userId", "==", auth.currentUser.uid),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.bold}>Order ID: {item.id.substring(0, 8)}...</Text>
      <Text>Date: {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}</Text>
      <Text>Total: ${item.totalPrice.toFixed(2)}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, backgroundColor: '#F5EFEA' }} />;
  }

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 50}}>You have no past orders.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#F5EFEA' },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  bold: { fontWeight: 'bold' },
});

export default ProfileScreen;
