import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace('ProductList');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (email === '' || password === '') {
        setErrorMessage('Email and password cannot be empty.');
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .catch(error => setErrorMessage(error.message));
  };

  const handleLogin = () => {
    if (email === '' || password === '') {
        setErrorMessage('Email and password cannot be empty.');
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chocolate Shop</Text>
      {errorMessage && <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 5 },
  buttonContainer: {
      marginTop: 10,
  }
});

export default LoginScreen;

