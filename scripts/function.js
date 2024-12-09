import { URL, TOKEN } from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleUpload = async (photo) => {
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: photo.uri, // URI da imagem
            name: 'photo.jpg', // Nome do arquivo
            type: 'image/jpeg', // Tipo do arquivo
        });

        const response = await fetch(`${URL}/sendPhoto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData, // Dados do formulário
        });

        if (!response.ok) {
            console.error(`Erro no upload: ${response.status} - ${response.statusText}`);
            return false; // Falha no upload
        }

        const data = await response.json();
        await AsyncStorage.setItem('uploadedImageUrl', data.imageUrl);
        console.log('Upload bem-sucedido:', data);

        return true; // Sucesso no upload
    } catch (error) {
        console.error('Erro no upload:', error);
        return false; // Erro no processo
    }
};

const getComplaint = async () => {
    try {
        const response = await fetch(`${URL}/complaint/obterDenuncia`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        });

        const complaintResult = await response.json();

        if (complaintResult && complaintResult.complaints.length) {
            Object.assign(complaintResult, {
                empty: false
            });
        } else {
            if (complaintResult) {
                Object.assign(complaintResult, {
                    empty: true
                });
            }
        }
        
        return complaintResult || { empty: true };
    } catch (error) {
        console.log('Deu error: ', error);
        return { error: 'Erro inesperado' }
    }
}


const submitComplaint = async (complaintData) => {
    try {
        const response = await fetch(`${URL}/complaint/novaDenuncia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(complaintData), // Envia os dados no formato JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ao enviar denúncia: ${response.status}`);
        }

        const data = await response.json();
        console.log('Denúncia enviada com sucesso:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao enviar denúncia:', error.message);
        return { success: false, error: error.message }; // Retorna o erro capturado
    }
};



const formatDate = (isoDate) => {
    const date = new Date(isoDate); // Converte a string para um objeto Date

    const day = String(date.getDate()).padStart(2, '0'); // Pega o dia com 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Pega o mês com 2 dígitos (0-11)
    const year = date.getFullYear(); // Pega o ano completo

    return `${day}.${month}.${year}`;
};

const getColor = (status) => {

    if (status == 'Ativo')
        status = 'Pendente';

    if (status == 'Pendente')
        return 'red';

    if (status == 'Em progresso')
        return 'orange';

    if (status == 'Finalizado')
        return 'green';


}
const getProgress = (status) => {

    if (status == 'Ativo')
        status = 'Pendente';

    if (status == 'Pendente')
        return '0.1';

    if (status == 'Em progresso')
        return '0.5';

    if (status == 'Finalizado')
        return '1.0';


}

const getUploadedImageUrl = async () => {
    try {
        const url = await AsyncStorage.getItem('uploadedImageUrl');
        return url;
    } catch (error) {
        console.error('Erro ao recuperar a URL:', error);
        return null;
    }
};


module.exports = {
    formatDate,
    getComplaint,
    getColor,
    getProgress,
    handleUpload,
    getUploadedImageUrl,
    submitComplaint
}

