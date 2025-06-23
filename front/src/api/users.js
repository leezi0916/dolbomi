import { camelToSnake, snakeToCamel } from '../utils/formatData';

import api from './axios';
import { API_ENDPOINTS } from './config';

export const userService = {
  //유저정보 불러오기(마이페이지 수정)
  getUserProfile: async (userId) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.PROFILE(userId));

      console.log('요청 URL:', API_ENDPOINTS.USERS.PROFILE(userId));
      return snakeToCamel(data);
    } catch (error) {
      console.error('프로필 조회 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },
  getCareGiverProfile: async (userNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.CAREPROFILE(Number(userNo)));
      return snakeToCamel(data[0]);
    } catch (error) {
      console.error('프로필 조회 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },
  //회원가입
  signUp: async (userData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.USERS.BASE, camelToSnake(userData));

      return data;
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '회원가입에 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },

  login: async (userId, userPwd) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.LOGIN(userId, userPwd));

      return snakeToCamel(data[0]); //
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '로그인에 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },

  // user 정보 수정 (마이페이지 수정)
  updateUserProfile: async (userId, updatedData) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.USERS.PROFILE(userId), camelToSnake(updatedData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      console.error('회원정보 수정 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },
};
