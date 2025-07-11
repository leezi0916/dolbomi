import api from './axios';
import { API_ENDPOINTS } from './config';

export const emailService = {
  sendEmailCode: async (email) => {
    return await api.post(API_ENDPOINTS.EMAIL.SEND_EMAIL_CODE, { email });
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
