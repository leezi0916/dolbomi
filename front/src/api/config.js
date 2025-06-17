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
    DETAIL: (no) => `/community/${no}`, // 특정 게시글 상세
  },

  USERS: {
    BASE: '/users',
    PROFILE: (userid) => `/users?user_id=${userid}`,
    // LOGIN: '/users/login' //실제에는 이렇게 해야함 아래는 JsonServer 사용시
    LOGIN: (user_id, user_pwd) => `/users?user_id=${user_id}&user_pwd=${user_pwd}`,
  },
  REVIEWS: {
    BASE: '/reviews',
    DETAIL: (userNo) => `/reviews?userNo=${userNo}`,
  },
  HIRING: {
    BASE: '/hiring',
  },

  HIRES: {
    BASE: '/hires',
  },

  PATIENT: {
    BASE: '/patients',
    DETAIL: (guardianNo) => `/patients?guardiaNo=${guardianNo}`,
    PATDETAIL: (patNo) => `/patients?id=${patNo}`,
    PUT: (patNo) => `/patients/${patNo}`,
    DELETE: (patNo) => `/patients/${patNo}`,
  },

  DISEASE: {
    BASE: '/disease',
    DETAIL: (disNo) => `/patients?disNo=${disNo}`,
  },
};
