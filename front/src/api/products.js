import api from './axios';
import { API_ENDPOINTS } from './config';

// 예시입니다. 저희 프로젝트에 맞게 변경해야 합니다.
export const getProducts = async () => {
  try {
    const { data } = await api.get(API_ENDPOINTS.PRODUCTS.BASE);
    return data;
  } catch (error) {
    console.log('상품정보를 가져오지 못함', error);
    throw error;
  }
};
