import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getComplaint, formatDate, getColor, getProgress } from '../../scripts/function';

const StatusScreen = ({ navigation }) => {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const complaint = await getComplaint();
        
        if (complaint && !complaint.empty) {
          setStatusData(
            complaint.complaints.map((item) => ({
              date: formatDate(item.createdAt),
              location: item.street + ', ' + item.number,
              status: item.status,
              progress: getProgress(item.status), 
              color: getColor(item.status),
            }))
          );
        } else {
          setStatusData([]); // Define como vazio caso não haja denúncias
        }
      } catch (error) {
        console.error('Erro ao buscar denúncias:', error);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchComplaintData(); // Chama a função de busca
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>STATUS DE DENÚNCIA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {statusData.length === 0 ? ( // Verifica se o array está vazio
          <Text style={styles.emptyMessage}>Nenhuma Denúncia Realizada</Text>
        ) : (
          statusData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${item.progress * 100}%`, backgroundColor: item.color },
                  ]}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Localidade: {item.location}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Status: {item.status}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E313F',
  },
  header: {
    marginTop: 60,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#3C3F4E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  date: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E313F',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StatusScreen;
