import api from './axios';
import { API_ENDPOINTS } from './config';

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
  getCommunity: async (role) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.LIST(role));
      return data;
    } catch (error) {
      console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
      throw new Error('서버 통신 불량');
    }
  },
  getQuestion: async (role) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.LIST(role));
      return data;
    } catch (error) {
      console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
      throw new Error('서버 통신 불량');
    }
  },
  getCommunityDetail: async (role) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.LIST(role));
      console.log('요청 URL:', API_ENDPOINTS.COMMUNITY.LIST(role));

      return data;
    } catch (error) {
      console.error('프로필 조회 실패:', error.response?.data?.message || error.message);
      throw new Error('서버 통신 불량');
    }
  },
};
