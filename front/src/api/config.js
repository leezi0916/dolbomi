// 예시입니다. 저희 프로젝트에 맞게 변경해야 합니다.

const { VITE_JSON_SERVER_URL, VITE_SPRING_URL, VITE_API_TIMEOUT = 5000, VITE_API_VERSION = 'v1' } = import.meta.env;

export const API_CONFIG = {
  BASE_URL: `${VITE_JSON_SERVER_URL}`, // Spring 들어가면 여기 변수만 VITE_SPRING_URL로 변경해야함
  TIMEOUT: VITE_API_TIMEOUT,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const API_ENDPOINTS = {
  // PRODUCTS: {
  //   BASE: '/products',
  // },
  COMMUNITY: {
    BASE: '/community', // 게시판 리스트 등
    DETAIL: (id) => `/community/${id}`, // 특정 게시글 상세
  },
};
