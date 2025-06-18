import { camelToSnake } from '../utils/formatData';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const userService = {
  //유저정보 불러오기(마이페이지 수정)
  getUserProfile: async (userId) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.PROFILE(userId));

      console.log('요청 URL:', API_ENDPOINTS.USERS.PROFILE(userId));
      return data;
    } catch (error) {
      console.error('프로필 조회 실패:', error.response?.data?.message || error.message);
      throw error;
    }
  },
  //회원가입
  signUp: async (userData) => {
    console.log(userData);
    try {
      const { data } = await api.post(API_ENDPOINTS.USERS.BASE, {
        user_id: userData.user_id,
        user_pwd: userData.user_pwd,
        user_name: userData.user_name,
        age: userData.age,
        gender: userData.gender,
        phone: userData.phone,
        address: userData.address,
        email: userData.email,
      });

      return data;
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '회원가입에 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },
  login: async (user_id, user_pwd) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.LOGIN(user_id, user_pwd));
      console.log(data[0]);
      return data[0]; //
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '로그인에 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },
};
