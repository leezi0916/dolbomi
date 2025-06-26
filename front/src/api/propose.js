import api from './axios';
import { API_ENDPOINTS } from './config';
import { camelToSnake, snakeToCamel } from '../utils/formatData';

export const proposerSevice = {
  getcareGiverLists: async (hiringNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PROPOSER.LIST(hiringNo));
      console.log(data);
      return snakeToCamel(data);
    } catch (error) {
      console.error(
        '돌봄대상자 구인정보를 가져오지 못함 : ',
        error.response?.data?.message || '돌봄대상자 구인목록 불러오기 실패'
      );
      throw error;
    }
  },

  // 간병인 신청 등록
  proposerToHiring: async ({ hiringNo, resumeNo, caregiverNo }) => {
    try {
      await api.post(API_ENDPOINTS.PROPOSER.BASE, camelToSnake({ hiringNo, resumeNo, caregiverNo }));
    } catch (error) {
      console.error('지원 신청 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // 신청 여부 확인 (프론트에서 버튼 조건 분기용)
  getProposerStatus: async ({ hiringNo, caregiverNo }) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PROPOSER.STATUS, {
        params: { hiringNo, caregiverNo },
      });
      return data.applied; // true 또는 false 반환한다고 가정
    } catch (error) {
      console.error('신청 여부 확인 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // 신청 취소 (삭제)
  //취소는 현재 json-server 사용중이라 백엔드 들어갈시 다시 수정해야할듯
  cancelProposer: async ({ caregiverNo, hiringNo }) => {
    try {
      // 삭제라면
      await api.delete(API_ENDPOINTS.PROPOSER.CANCEL(camelToSnake({ hiringNo, caregiverNo })));
    } catch (error) {
      console.error('신청 취소 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },
};
