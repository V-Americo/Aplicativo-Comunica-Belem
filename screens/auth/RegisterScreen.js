import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
    } else {
      navigation.navigate('ClientHomeStack', {
        screen: 'ClientHomeScreen'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAÇA SEU CADASTRO</Text>

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

      <Text style={styles.topic}>Confirme sua Senha</Text>
      <TextInput 
        secureTextEntry={true} 
        style={styles.input} 
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonOption}>
          Não tem Login? <Text style={styles.buttonOptionLogin}>Faça seu login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
    color: 'white',
  },
  buttonRegister: {
    backgroundColor: '#034E8F',
    padding: '3%',
    marginVertical: 10,
    marginRight: 70,
    marginLeft: 70,
    borderRadius: 8,
  },
  buttonLogin: {
    fontSize: 18,
    color: 'white',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  buttonOption: {
    color: 'white',
    height: 40,
    padding: 10,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonOptionLogin: {
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
