import { snakeToCamel } from '../utils/formatData';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const notificationService = {
  // 유저 알림 리스트 조회
  getNotifications: async (userNo) => {
    try {
      console.log('getNotifications 호출, userNo:', userNo);
      console.log('요청 URL:', API_ENDPOINTS.NOTIFICATIONS.LIST(userNo));
      const { data } = await api.get(API_ENDPOINTS.NOTIFICATIONS.LIST(userNo));

      console.log('서버 응답 데이터:', data);
      return snakeToCamel(data);
    } catch (error) {
      console.error('알림 조회 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },
};
