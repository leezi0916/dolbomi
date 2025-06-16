import api from './axios';
import { API_ENDPOINTS } from './config';

export const hireService = {
  getHireLists: async (params = {}) => {
    try {
      const queryParams = {};

      if (params.location) queryParams.pat_address = params.location;

      if (params.gender) queryParams.pat_gender = params.gender; // 'pat_gender'는 그대로 유지
      // 백엔드에서는 이 `account` 값을 최소 시급으로 간주하고 필터링(account >= 13000).
      if (params.account) queryParams.account = parseInt(params.account, 10);
      // 백엔드에서는 이 키워드를 'title' 필드 등에 대해 포함 검색(LIKE 쿼리 등)을 수행
      if (params.keyword) queryParams.search_keyword = params.keyword;

      if (params.care_status === true) queryParams.care_status = true; // true일 경우에만 전송
      // 백엔드에서는 이 날짜 이후의 데이터를 필터링(`start_date >= '2025-07-01'`).
      if (params.startDate) queryParams.start_date = params.startDate;
      // 백엔드에서는 이 날짜 이전의 데이터를 필터링(`end_date <= '2025-07-31'`).
      if (params.endDate) queryParams.end_date = params.endDate;

      const { data } = await api.get(API_ENDPOINTS.HIRES.BASE, {
        params: queryParams,
      });
      return data;
    } catch (error) {
      console.error(
        '돌봄대상자 구인정보를 가져오지 못함 : ',
        error.response?.data?.message || '돌봄대상자 구인목록 불러오기 실패'
      );
      throw error;
    }
  },
};
