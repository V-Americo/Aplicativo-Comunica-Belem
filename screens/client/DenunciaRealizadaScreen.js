import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const DenunciaRealizadaScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('FeedbackScreen'); // Navega para a tela de feedback após 4 segundos
    }, 4000);

    // Limpa o timer caso o componente seja desmontado antes de completar os 4 segundos
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/denunciaRealizada.png')}
        style={styles.denunciaImage}
      />

      <Text style={styles.reportText}>
        Denúncia Realizada
      </Text>

      <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.navigate('ClientHomeScreen')}>
        <Text style={styles.buttonOption}>
          Voltar para o início
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#2E313F',
  },

  denunciaImage: {
    width: 180,
    height: 180,
    borderRadius: 35,
    marginBottom: 50,
  },

  reportText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  buttonOption: {
    fontSize: 10,
    textDecorationLine: 'underline',
    marginTop: 30,
    color: 'gray',
  },
});

export default DenunciaRealizadaScreen;
