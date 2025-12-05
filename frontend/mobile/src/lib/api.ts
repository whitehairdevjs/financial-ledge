import axios from 'axios';
import { Platform } from 'react-native';

// 개발 환경에서 플랫폼별 API URL 설정
const getApiUrl = () => {
  if (__DEV__) {
    // Android 에뮬레이터는 10.0.2.2 사용
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8080/api';
    }
    // iOS 시뮬레이터와 실제 기기는 localhost 사용
    return 'http://localhost:8080/api';
  }
  // 프로덕션 환경 (나중에 설정)
  return 'https://your-production-api.com/api';
};

const apiClient = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default apiClient;

