import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ClientHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.home}>Home</Text>
      {/* Mensagem de boas-vindas alinhada à esquerda */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Olá,</Text>
        <Text style={styles.userNameText}>{'{User Teste} !'}</Text>
        <Text style={styles.welcomeSubText}>Seja Bem-Vindo!</Text>
      </View>

      {/* Texto e underline */}
      <View style={styles.textSeparatorContainer}>
        <Text style={styles.subWelcomeText}>Deseja Fazer uma Denúncia?</Text>
        <View style={styles.underline} />
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        {/* Botão para Denúncias */}
        <TouchableOpacity
          style={styles.buttonDenuncia}
          onPress={() => navigation.navigate('DenunciaFotoScreen')}
        >
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTextDenuncia}>DENUNCIE</Text>
            <Text style={styles.buttonTextSecundario}>um vazamento</Text>
          </View>
          <Image
            source={require('../../assets/denuncia.png')}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

        {/* Botão para Status */}
        <TouchableOpacity
          style={styles.buttonStatus}
          onPress={() => { navigation.navigate('StatusScreen') }}
        >
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTextStatus}>STATUS</Text>
            <Text style={styles.buttonTextSecundario}>Das Denúncias</Text>
          </View>
          <Image
            source={require('../../assets/status.png')}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 16,
  },
  home: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  welcomeContainer: {
    marginTop: 40,
    marginBottom: 10, // Aproxima os botões
    alignItems: 'flex-start', // Texto alinhado à esquerda
  },
  welcomeText: {
    fontSize: 36,
    fontFamily: 'Poppins',
    fontWeight: 'regular',
    color: '#2E313F',
  },
  userNameText: {
    fontSize: 36, // Tamanho do nome
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#2E313F',
  },
  welcomeSubText: {
    fontSize: 36,
    fontFamily: 'Poppins', // Fonte Poppins
    fontWeight: 'regular',
    color: '#2E313F',
  },
  textSeparatorContainer: {
    marginBottom: -5, // Ajusta a posição do texto
  },
  subWelcomeText: {
    marginTop: 30,
    fontSize: 13, // Aumenta o tamanho do texto
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#2E313F',
    marginBottom: 10, // Aproxima mais dos botões
    textAlign: 'left',
  },
  underline: {
    width: '40%', // Largura ajustada para o texto
    marginLeft: 20,
    height: 2,
    backgroundColor: '#2E313F',
    marginBottom: 10, // Distância entre a linha e os botões
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  buttonDenuncia: {
    flexDirection: 'row',
    backgroundColor: '#2E313F',
    padding: 40, // Aumenta o tamanho dos botões
    marginVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%', // Aumenta a largura dos botões
  },
  buttonStatus: {
    flexDirection: 'row',
    backgroundColor: '#2E313F',
    padding: 40, // Aumenta o tamanho dos botões
    marginVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    width: '95%', // Aumenta a largura dos botões
  },
  buttonIcon: {
    width: 80, // Aumenta o tamanho do ícone
    height: 80, // Aumenta o tamanho do ícone
  },
  buttonTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonTextDenuncia: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',

    fontSize: 24, // Aumenta o texto do botão
    color: 'white',
  },
  buttonTextStatus: {
    marginLeft: 15,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 24, // Aumenta o texto do botão
    color: 'white',
  },
  buttonTextSecundario: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 18, // Aumenta o subtítulo dos botões
  },
});

export default ClientHomeScreen;
