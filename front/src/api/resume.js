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
};
