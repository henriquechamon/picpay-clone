import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Pages/LoginPage/Login';
import Home from './src/Pages/Home/Home';
import Transferir from './src/Pages/Transferir/Transferir';
import Comprovante from './src/Pages/Comprovante/Comprovante';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
      <Stack.Screen name="Transferir" component={Transferir} options={{ headerShown: true}}/>
      <Stack.Screen name="Comprovante" component={Comprovante} options={{ headerShown: true}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
