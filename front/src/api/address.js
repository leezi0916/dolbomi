import { snakeToCamel } from '../utils/formatData';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const addressService = {
  getRegionList: async (cd) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.API.REGION(cd));
      return snakeToCamel(data);
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '모집 상태 변경에 실패했습니다.';
        throw new Error(message);
      }
      throw new Error('서버 통신 불량');
    }
  },
};
