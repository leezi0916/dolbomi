import { camelToSnake } from '../../utils/formatData';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const resumeService = {
  //이력서등록
  postNewResume: async (resumeData) => {
    try {
      await api.post(API_ENDPOINTS.RESUME.BASE, camelToSnake(resumeData));
    } catch (error) {
      console.log(error);
      throw new Error('서버 통신 불량');
    }
  },

    // 특정 이력서 가져오기
    getResume: async (resumeNo) => {
      try {
        await api.get(API_ENDPOINTS.RESUME.DETAIL(resumeNo));
      } catch (error) {
        console.log(error);
        throw new Error('서버 통신 불량');
      }
    },
};
