import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace('ProductList');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (!auth) return;
    createUserWithEmailAndPassword(auth, email, password)
      .catch(error => setErrorMessage(error.message));
  };

  const handleLogin = () => {
    if (!auth) return;
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => setErrorMessage(error.message));
  };

  if (!auth) {
    return (
      <View style={styles.container}>
        <Text>Connecting to Firebase...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chocolate Shop</Text>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#622A0F" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} color="#8D4925" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F5EFEA' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#622A0F' },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
  buttonContainer: { marginTop: 10, borderRadius: 5, overflow: 'hidden' }
});

export default LoginScreen;
