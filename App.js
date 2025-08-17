import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native'; // <-- Add this import

// Add these lines to ignore the warnings
LogBox.ignoreLogs(['@firebase/analytics']);
LogBox.ignoreLogs(['@firebase/auth']);
import LoginScreen from './screens/LoginScreen';
import ProductListScreen from './screens/ProductListScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AdminScreen from './screens/AdminScreen';
import AddProductScreen from './screens/AddProductScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Our Chocolates' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Chocolate Details' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmed', headerLeft: null }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Orders' }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin Panel' }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
        <Stack.Screen name="AdminOrderList" component={AdminOrderListScreen} options={{ title: 'Customer Orders' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// This is the main entry point of the ChocolateApp. It sets up the navigation structure using React Navigation.
// The app includes screens for user login, product listing, cart management, checkout, and an admin panel for managing products and orders.
// The Stack.Navigator component defines the navigation stack, allowing users to navigate between different screens.
// Each screen is associated with a component that renders the respective UI and functionality.
// The initial route is set to the Login screen, and header options are configured to hide the header for the login screen.
// This structure allows for a clean and organized navigation flow within the app, enhancing user experience.   