import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ScrollView } from 'react-native-gesture-handler';
import { submitComplaint, getUploadedImageUrl } from '../../scripts/function'

const id = Platform.OS !== 'web' ? uuidv4() : `${Date.now()}-${Math.random()}`;
console.log('Generated UUID:', id);

const EnderecoScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [region, setRegion] = useState(null); // Inicializa como null para o mapa não aparecer inicialmente

  // Estados para armazenar os valores dos TextInput
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleAddressSelect = (data, details) => {
    const { formatted_address, geometry } = details;
    setSelectedAddress(formatted_address);
    setRegion({
      latitude: geometry.location.lat,
      longitude: geometry.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleSubmit = async () => {

    setIsLoading(true);

    try {
      const imageUrl = await getUploadedImageUrl();

      const complaintData = {
        description: descricao,
        referencePoint: referencia,
        complement: complemento,
        number: parseInt(numero, 10) || null,
        street: selectedAddress,
        photoUrl: imageUrl,
      };

      const result = await submitComplaint(complaintData);

      setIsLoading(false);

      if (result.success) {
        Alert.alert('Sucesso', 'Denúncia enviada com sucesso!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('DenunciaRealizadaScreen'),
          },
        ]);
      } else {
        Alert.alert('Erro', `Falha ao enviar denúncia: ${result.error}`);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    }
  };


  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Enviando denúncia...</Text>
        </View>
      )}
      {!selectedAddress ? (
        // Mostra o campo de busca até o endereço ser selecionado
        <View style={styles.searchContainer}>
          <Text style={styles.titleText}>Inserir Endereço de Denúncia</Text>
          <GooglePlacesAutocomplete
            placeholder="Digite um endereço"
            onPress={handleAddressSelect}
            query={{
              key: 'AIzaSyCfCJiVu__WNPcsTKfh8xj73SDwdwMYY9c',
              language: 'pt-BR',
            }}
            fetchDetails={true}
            styles={{
              textInput: {
                ...styles.searchInput,
                placeholderTextColor: '#FFFFFF',
              },
            }}
            textInputProps={{
              placeholderTextColor: 'gray',
            }}
          />
        </View>
      ) : (
        // Mostra o mapa e os campos adicionais depois que o endereço for selecionado
        <>
          <View style={styles.mapContainer}>
            <MapView style={styles.map} region={region}>
              <Marker coordinate={region} />
            </MapView>
          </View>
          <ScrollView style={styles.detailsContainer}>
            <Text style={styles.address}>{selectedAddress}</Text>
            <TextInput
              style={styles.input}
              placeholder="Número (se tiver)"
              placeholderTextColor="#aaa"
              value={numero}
              onChangeText={(text) => setNumero(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Complemento"
              placeholderTextColor="#aaa"
              value={complemento}
              onChangeText={(text) => setComplemento(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ponto de Referência"
              placeholderTextColor="#aaa"
              value={referencia}
              onChangeText={(text) => setReferencia(text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição:"
              placeholderTextColor="#aaa"
              value={descricao}
              onChangeText={(text) => setDescricao(text)}
              multiline
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={isLoading}>
              <Text style={styles.buttonText}>Finalizar Denúncia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#2E313F',
  },
  titleText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 60,
  },
  searchContainer: {
    marginTop: 60,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    placeholderTextColor: '#aaaaa',
  },
  searchInput: {
    color: 'white',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    placeholderTextColor: '#FFFFFF',
  },
  mapContainer: {
    height: '40%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2E313F',
  },
  address: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    height: 50,
    backgroundColor: '#034E8F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default EnderecoScreen;
