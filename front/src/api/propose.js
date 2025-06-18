import api from './axios';
import { API_ENDPOINTS } from './config';

export const proposerSevice = {
  
  getcareGiverLists: async (jobOpening_no) => {
    try {
      
      const { data } = await api.get(API_ENDPOINTS.CAREGIVERPROPOSER.LIST(jobOpening_no)
      );
      return data;
    } catch (error) {
      console.error(
        '돌봄대상자 구인정보를 가져오지 못함 : ',
        error.response?.data?.message || '돌봄대상자 구인목록 불러오기 실패'
      );
      throw error;
    }
  },

  getguardianLists: async (resume_no) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.CAREGIVERPROPOSER.LIST(resume_no));
      return data;
    } catch (error) {
      console.error(
        '돌봄대상자 구인정보를 가져오지 못함 : ',
        error.response?.data?.message || '돌봄대상자 구인목록 불러오기 실패'
      );
      throw error;
    }
  },
};
