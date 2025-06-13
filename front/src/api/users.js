import { MdEmail } from 'react-icons/md';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const userService = {
  //회원가입
  signUp: async (userData) => {
    console.log('????');
    try {
      const { data } = await api.post(API_ENDPOINTS.USERS.BASE, {
        userid: userData.userid,
        userpwd: userData.userpwd,
        username: userData.username,
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
  login: async (userid, userpwd) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.LOGIN(userid, userpwd));
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
