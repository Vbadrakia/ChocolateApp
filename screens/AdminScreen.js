import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}><Button title="Add New Product" onPress={() => navigation.navigate('AddProduct')} color="#622A0F" /></View>
      <View style={styles.buttonContainer}><Button title="View Customer Orders" onPress={() => navigation.navigate('AdminOrderList')} color="#622A0F" /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F5EFEA' },
  buttonContainer: { marginVertical: 10, borderRadius: 5, overflow: 'hidden' }
});

export default AdminScreen;


// ========================================================================
// File: screens/AddProductScreen.js
// ========================================================================
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !description || !price || !imageUrl) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        ingredients,
      });
      Alert.alert('Success', 'Product added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Image URL" value={imageUrl} onChangeText={setImageUrl} />
      <TextInput style={styles.input} placeholder="Ingredients (comma separated)" value={ingredients} onChangeText={setIngredients} />
      {loading ? <ActivityIndicator /> : <Button title="Save Product" onPress={handleAddProduct} color="#622A0F" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5EFEA' },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default AddProductScreen;

