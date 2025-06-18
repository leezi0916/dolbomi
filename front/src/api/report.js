import api from './axios';
import { API_ENDPOINTS } from './config';

export const reportService = {
  getReports: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.REPORT.BASE);
      return data;
    } catch (error) {
      console.log('일지를 가져오지 못함 : ', error.response?.data?.message || '일지 불러오기 실패');
      throw error;
    }
  },
};
