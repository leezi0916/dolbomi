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
  getCommunityDetail: async (no) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.DETAIL(no));
      console.log('요청 URL:', API_ENDPOINTS.COMMUNITY.DETAIL(no));

      return data;
    } catch (error) {
      console.error('프로필 조회 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },
};
