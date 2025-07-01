import api from './axios';
import { API_ENDPOINTS } from './config';
import { snakeToCamel, camelToSnake } from '../utils/formatData';

export const matchingService = {
  //매칭목록 조회
  getMatchginCargiver: async (patNo, status) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MATCHING.LIST(patNo, status));

      return snakeToCamel(data);
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '매칭목록을 불러오는데 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },

  // 종료된 매칭 조회하기
  getEndedMatchingCaregivers: async (patNo, page = 0, size = 5, status = 'N') => {
    try {
      const { data } = await api.get(API_ENDPOINTS.MATCHING.ENDLIST(patNo, status), {
        params: {
          page,
          size,
        },
      });
      return snakeToCamel(data);
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '종료된 매칭을 불러오는데 실패했습니다.';
        throw new Error(message);
      }
      throw new Error('서버 통신 불량');
    }
  },
};
