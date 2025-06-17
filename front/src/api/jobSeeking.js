// 구직 API
import api from './axios';
import { API_ENDPOINTS } from './config';

export const jobSeekingService = {
  // 이력서(구직) 목록 가져오기
  getResumeList: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.JOBSEEKING.BASE);
      return data;
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '이력서 리스트를 가져오는데에 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },
};
