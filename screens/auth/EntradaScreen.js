import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const EntradaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTextTitle}>
          Bem-vindo ao Comunica Belém!
        </Text>
        <Text style={styles.infoText}>

        Facilitamos sua comunicação com as autoridades locais para resolver problemas 
        relacionados a vazamentos de água. Aqui, você poderá registrar denúncias, acompanhar
        o status delas e contribuir para uma cidade mais sustentável.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Copyright © 2024 - Todos direitos reservados - VOLVERE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#2E313F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextTitle: {
    marginTop:60,
    marginBottom:10,
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight:'bold',
  },
  infoText: {
    justifyContent:'space-around',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#034E8F',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop:80,
    marginBottom: 10,
  },
});

export default EntradaScreen;
