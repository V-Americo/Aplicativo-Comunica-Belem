import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const EncerramentoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
            Agradecemos Seu FeedBack!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClientHomeScreen')}>
          <Text style={styles.buttonText}>Voltar ao Inicio</Text>
        </TouchableOpacity>
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
  infoText: {
    fontSize:30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 50,

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

export default EncerramentoScreen;
