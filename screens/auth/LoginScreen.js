import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      navigation.navigate('ClientHomeStack', {
        screen: 'ClientHomeScreen'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAÇA SEU LOGIN</Text>

      <Text style={styles.topic}>Email</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.topic}>Senha</Text>
      <TextInput 
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonOption}>
          Não tem Login? <Text style={styles.buttonOptionRegister}>Registre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
    backgroundColor: '#2E313F',
  },
  title: {
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  topic: {
    marginBottom: 5,
    color: 'white',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  input: {
    color: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
  },
  buttonLogin: {
    backgroundColor: '#034E8F',
    padding: '3%',
    marginVertical: 10,
    marginRight: 70,
    marginLeft: 70,
    borderRadius: 8,
  },
  buttonOption: {
    color: 'white',
    height: 40,
    padding: 10,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonOptionRegister: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
