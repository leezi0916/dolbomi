import { camelToSnake, snakeToCamel } from '../utils/formatData';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const reportService = {
  getReports: async (patNo) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.REPORT.PROFILE(patNo));
      return snakeToCamel(data);
    } catch (error) {
      console.log('일지를 가져오지 못함 : ', error.response?.data?.message || '일지 불러오기 실패');
      throw error;
    }
  },
  addReports: async (report) => {
    try {
      const reportInfo = {
        ...report,
        createDate: report.createDate || new Date().toISOString(),
        updateDate: new Date().toISOString(),
      };

      const isTrue = await api.get(API_ENDPOINTS.REPORT.SEARCH(report.reportNo));
      if (isTrue.data) {
        console.log('데이터가 있음', isTrue.data);
        // 데이터가 있으면 수정(patch)로 넘기기
        throw new Error('불량');
      }
      // 데이터가 없으면 새로운거 추가
      const { data } = await api.post(API_ENDPOINTS.REPORT.BASE, camelToSnake(reportInfo));
      return data;
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '일지작성에 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },
};
