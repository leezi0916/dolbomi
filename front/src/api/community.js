import api from './axios';
import { API_ENDPOINTS } from './config';

export const commuService = {
  getCommunity: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.BASE);
      return data;
    } catch (error) {
      console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
      throw error;
    }
  },
};
