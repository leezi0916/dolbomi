import api from './axios';
import { API_ENDPOINTS } from './config';
import { camelToSnake, snakeToCamel } from '../utils/formatData';

export const proposerService = {
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

  // 간병인 신청 등록
  proposerToHiring: async ({ hiringNo, resumeNo, caregiverNo }) => {
    try {
      const res = await api.post(API_ENDPOINTS.PROPOSER.BASE, camelToSnake({ hiringNo, resumeNo, caregiverNo }));

    } catch (error) {
      console.error('지원 신청 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // 신청 여부 확인 (프론트에서 버튼 조건 분기용)
  getProposerStatus: async ({ caregiverNo, hiringNo }) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PROPOSER.STATUS(hiringNo, caregiverNo));
      return data;
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
      await api.delete(API_ENDPOINTS.PROPOSER.CANCEL(hiringNo, caregiverNo));
    } catch (error) {
      console.error('신청 취소 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  //지원현황에서 이력서 보고 수락하기
  acceptMatching: async ({ hiringNo, resumeNo }) => {
    try {
      const res = await api.post(API_ENDPOINTS.PROPOSER.ACCEPT, camelToSnake({ hiringNo, resumeNo }));
      return res.data;
    } catch (error) {
      console.error('매칭 수락 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  //이미 매칭된 이력서인지
  checkAccepted: async ({ hiringNo, resumeNo }) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PROPOSER.CHECK_ACCEPTED(hiringNo, resumeNo));
      return snakeToCamel(data);
    } catch (error) {
      console.error('매칭 여부 확인 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // 내 지원현황 목록
  getMyProposer: async (currentPage, userNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PROPOSER.MYLIST(currentPage, userNo));
      return snakeToCamel(data);
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '내 지원현황을 불러오는데 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },
};
