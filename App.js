import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ClientHomeScreen from './screens/client/ClientHomeScreen';
import DenunciaFotoScreen from './screens/client/DenunciaFotoScreen';
import EnderecoScreen from './screens/client/EnderecoScreen';
import DenunciaRealizadaScreen from './screens/client/DenunciaRealizadaScreen';
import FeedbackScreen from './screens/client/FeedbackScreen';
import StatusScreen from './screens/client/StatusScreen';
import EntradaScreen from './screens/auth/EntradaScreen';
import EncerramentoScreen from './screens/client/EncerramentoScreen';
// Stack Navigator para autenticação
const AuthStack = createStackNavigator();
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="Entrada" 
        component={EntradaScreen} 
        options={{ headerShown: false }} 
      />
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
      <AuthStack.Screen 
        name="ClientHomeStack" 
        component={ClientHomeStackNavigator} 
        options={{ headerShown: false }} 
      />
    </AuthStack.Navigator>
  );
}

// Stack Navigator para Client Home
const ClientHomeStack = createStackNavigator();
function ClientHomeStackNavigator() {
  return (
    <ClientHomeStack.Navigator>
      <ClientHomeStack.Screen 
        name="ClientHomeScreen" 
        component={ClientHomeScreen} 
        options={{ headerShown: false }} 
      />
      <ClientHomeStack.Screen 
        name="DenunciaFotoScreen" 
        component={DenunciaFotoScreen} 
        options={{ headerShown: false }} 
      />
      <ClientHomeStack.Screen 
        name="EnderecoScreen" 
        component={EnderecoScreen} 
        options={{ headerShown: false }} 
      />
      <ClientHomeStack.Screen 
        name="FeedbackScreen" 
        component={FeedbackScreen} 
        options={{ headerShown: false }} 
      />
      <ClientHomeStack.Screen 
        name="DenunciaRealizadaScreen" 
        component={DenunciaRealizadaScreen} 
        options={{ headerShown: false }} 
      />
      <ClientHomeStack.Screen 
        name="StatusScreen" 
        component={StatusScreen} 
        options={{ headerShown: false }} 
      />
      <ClientHomeStack.Screen 
        name="EncerramentoScreen" 
        component={EncerramentoScreen} 
        options={{ headerShown: false }} 
      />
    </ClientHomeStack.Navigator>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E313F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalText: {
    color: 'white',
  },
  buttonStart: {
    color: 'white',
    backgroundColor: '#ff6347',
  },
});

// Função principal do App
export default function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}
