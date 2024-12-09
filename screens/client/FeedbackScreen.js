import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FeedbackScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleFeedbackSubmit = () => {
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    // Lógica para enviar o feedback
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avalie sua experiência!</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity key={value} onPress={() => handleRating(value)}>
            <FontAwesome
              name={value <= rating ? 'star' : 'star-o'}
              size={30}
              color="#FFFFFF"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Algo que queira nos falar?"
        placeholderTextColor="#AAAAAA"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EncerramentoScreen')} >
        <Text style={styles.buttonText}>Enviar FeedBack</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E313F',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    height: 100,
    backgroundColor: '#3C3F4C',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#034E8F',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
