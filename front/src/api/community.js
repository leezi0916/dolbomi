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
  getGuardian: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.GUARDIAN);
      return snakeToCamel(data);
    } catch (error) {
      console.log('게시판정보를 가져오지 못함 : ', error.response?.data?.message || '게시판목록 불러오기 실패');
      throw new Error('서버 통신 불량');
    }
  },
  createPage: async (role) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.CREATE(role));
      return snakeToCamel(data);
    } catch (error) {
      console.log('? : ', error.response?.data?.message || '?');
      throw new Error('서버 통신 불량');
    }
  },
  createPost: async (role, formData) => {
    try {
      const { data } = await api.post(`/community/v1/${role}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('게시글 등록 실패:', error.response?.data?.message || error.message);
      throw new Error('게시글 등록 실패');
    }
  },

  getCommunityDetail: async (no) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COMMUNITY.DETAIL(no));
      console.log('요청 URL:', API_ENDPOINTS.COMMUNITY.LIST(no));

      return data;
    } catch (error) {
      console.error('프로필 조회 실패:', error.response?.data?.message || error.message);
      throw new Error('서버 통신 불량');
    }
  },
};
