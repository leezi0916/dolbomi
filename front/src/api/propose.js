import api from './axios';
import { API_ENDPOINTS } from './config';
import { snakeToCamel } from '../utils/formatData';

export const proposerSevice = {
  getcareGiverLists: async (hiringNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PROPOSER.LIST(hiringNo));
      return snakeToCamel(data);
    } catch (error) {
      console.error(
        '돌봄대상자 구인정보를 가져오지 못함 : ',
        error.response?.data?.message || '돌봄대상자 구인목록 불러오기 실패'
      );
      throw error;
    }
  },


};
