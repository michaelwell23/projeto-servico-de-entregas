import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL:
    Platform.OS === 'ios'
      ? 'http://localhost:3001'
      : 'http://192.168.0.62:3001',
});

export default api;
