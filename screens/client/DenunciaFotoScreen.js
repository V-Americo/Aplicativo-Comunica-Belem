import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleUpload } from '../../scripts/function';


const DenunciaFotoScreen = ({ navigation }) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para gerenciar o carregamento
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos da permissão da sua câmera</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
    }
  };

  const savePicture = async () => {
    setIsLoading(true); // Exibe o indicador de carregamento
    try {
      const isUploaded = await handleUpload(photo); // Aguarda o retorno da função de upload

      setIsLoading(false); // Oculta o indicador de carregamento

      if (isUploaded) {
        Alert.alert('Sucesso', 'Foto enviada com sucesso!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('EnderecoScreen'), // Navega após o sucesso
          },
        ]);
      } else {
        Alert.alert('Erro', 'Falha no envio da foto. Tente novamente.');
      }
    } catch (error) {
      setIsLoading(false); // Oculta o indicador de carregamento
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    }
  };


  const redoPicture = () => {
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={30} color="white" style={{ marginTop: 20 }} />
        </TouchableOpacity>
        <Text style={styles.topBarText}>REPORTAR VAZAMENTO</Text>
        <View style={{ width: 30 }} />
      </View>

      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.preview} />
          <View style={styles.buttonChoice}>
            {isLoading ? (
              // Exibe o indicador de carregamento durante o upload
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <>
                <TouchableOpacity style={styles.button} onPress={savePicture}>
                  <Text style={styles.textChoice}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={redoPicture}>
                  <Text style={styles.textChoice}>Refazer</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : (
        <>
          {/* Área da câmera */}
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

          {/* Barra inferior com o botão de captura */}
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureCircle} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E313F',
  },
  topBar: {
    height: 100,
    backgroundColor: '#2E313F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarText: {
    marginTop: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#2E313F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#000',
  },
  captureCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 35,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E313F',
  },
  preview: {
    width: '100%',
    height: '90%',
  },
  buttonChoice: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E313F',
    padding: 10,
    borderRadius: 10,
  },
  textChoice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DenunciaFotoScreen;
