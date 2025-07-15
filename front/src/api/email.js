import api from './axios';
import { API_ENDPOINTS } from './config';

export const emailService = {
  sendResetLink: async (email) => {
    try {
      const response = await api.post(API_ENDPOINTS.EMAIL.SEND_RESET_LINK, { email });
      return response;
    } catch (error) {
      console.error('메일 전송실패 :', error.response?.data?.message || error.message);
      throw error;
    }
  },

  sendCode: async (email) => {
    try {
      const response = await api.post(API_ENDPOINTS.EMAIL.SEND_CODE, { email });
      return response;
    } catch (error) {
      console.error('메일 전송실패 :', error.response?.data?.message || error.message);
      throw error;
    }
  },

  verifyEmailCode: async (email, code) => {
    try {
      const response = await api.post(API_ENDPOINTS.EMAIL.VERIFY_EMAIL_CODE, { email, code });
      return response;
    } catch (error) {
      console.error('가입된 사용자 없음 :', error.response?.data?.message || error.message);
      throw error;
    }
  },
};
