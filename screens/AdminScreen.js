import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Add New Product" onPress={() => navigation.navigate('AddProduct')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="View Customer Orders" onPress={() => navigation.navigate('AdminOrderList')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  buttonContainer: {
      marginVertical: 10,
  }
});

export default AdminScreen;
