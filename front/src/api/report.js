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
        //db에서 reportNo 하나 넣어야함
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString(),
        status: 'Y',
      };

      // reportContent 초기화
      let reportContent = '';

      // sub_title과 content를 동적으로 병합
      Object.keys(data).forEach((key) => {
        const subTitleMatch = key.match(/^sub_title(\d+)$/);
        if (subTitleMatch) {
          const index = subTitleMatch[1];
          const subTitle = data[`sub_title${index}`];
          const content = data[`content${index}`];

          if (subTitle && content) {
            reportContent += `${subTitle}\n${content}\n\n`;
          }
        }
      });

      // trim하여 불필요한 줄바꿈 제거
      reportInfo.reportContent = reportContent.trim();

      // 불필요한 sub_title 및 content 필드 제거
      Object.keys(data).forEach((key) => {
        if (key.startsWith('sub_title') || key.startsWith('content')) {
          delete reportInfo[key];
        }
      });
      console.log(reportInfo);

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
  modifyReports: async (report) => {
    try {
      const reportInfo = {
        ...report,
        updateDate: new Date().toISOString(),
      };

      const { data } = await api.patch(API_ENDPOINTS.REPORT.SEARCH(report.reportNo), camelToSnake(reportInfo));
      return data;
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '일지수정에 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },
};
