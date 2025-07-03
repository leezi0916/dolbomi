import api from './axios';
import { API_ENDPOINTS } from './config';
import { snakeToCamel } from '../utils/formatData';

export const commuService = {
  // getCommunity: async (status, role) => {
  //   try {
  //     const { data } = await api.get(API_ENDPOINTS.COMMUNITY.LIST(status, role));
  //     return data;
  //   } catch (error) {
  //     console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
  //     throw new Error('서버 통신 불량');
  //   }
  // },
  // getQuestion: async (status, role, id) => {
  //   try {
  //     const { data } = await api.get(API_ENDPOINTS.COMMUNITY.QUESTION(status, role, id));
  //     return data;
  //   } catch (error) {
  //     console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
  //     throw new Error('서버 통신 불량');
  //   }
  // },
  // getCommunityDetail: async (no) => {
  //   try {
  //     const { data } = await api.get(API_ENDPOINTS.COMMUNITY.DETAIL(no));
  //     console.log('요청 URL:', API_ENDPOINTS.COMMUNITY.DETAIL(no));

  //     return data;
  //   } catch (error) {
  //     console.error('프로필 조회 실패:', error.response?.data?.message || error.message);
  //     throw new Error('서버 통신 불량');
  //   }
  // },
  getCaregiver: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.CAREGIVER);
      return snakeToCamel(data);
    } catch (error) {
      console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
      throw new Error('서버 통신 불량');
    }
  },
  getQuestion: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.QUESTION);
      return snakeToCamel(data);
    } catch (error) {
      console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
      throw new Error('서버 통신 불량');
    }
  },
  getQuestionHistory: async (userNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.QUESTION_HISTORY(userNo));
      return snakeToCamel(data);
    } catch (error) {
      console.log(`질문 상세(${userNo})를 가져오지 못함: `, error.response?.data?.message || '실패');
      throw new Error('서버 통신 불량');
    }
  },
  getGuardian: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.GUARDIAN);
      return snakeToCamel(data);
    } catch (error) {
      console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
      throw new Error('서버 통신 불량');
    }
  },
  createCommunity: async (boardData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.COMMUNITY.BASE, boardData);
      return snakeToCamel(data);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 작성에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
  createReply: async (replyData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.COMMUNITY.REPLY, replyData);
      return snakeToCamel(data);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '댓글 작성에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
  getCommunityDetail: async (boardNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.DETAIL(boardNo));
      console.log('요청 URL:', API_ENDPOINTS.COMMUNITY.DETAIL(boardNo));
      return snakeToCamel(data);
    } catch (error) {
      console.error('게시글 조회 실패:', error.response?.data?.message || error.message);
      throw new Error('서버 통신 불량');
    }
  },
};
