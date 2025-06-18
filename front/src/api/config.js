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
    DETAIL: (no) => `/community?no=${no}`, // 특정 게시글 상세
  },

  USERS: {
    BASE: '/users',

    PROFILE: (user_id) => `/users?user_id=${user_id}`,

    // LOGIN: '/users/login' //실제에는 이렇게 해야함 아래는 JsonServer 사용시
    LOGIN: (user_id, user_pwd) => `/users?user_id=${user_id}&user_pwd=${user_pwd}`,
    DETAIL: (user_id) => `/users?user_id=${user_id}`,
  },
  REVIEWS: {
    BASE: '/reviews',
    DETAIL: (userNo) => `/reviews?userNo=${userNo}`,
  },
  HIRING: {
    BASE: '/hiring',
    DETAIL: (hiringNo) => `/hiring?hiring_no=${hiringNo}`,
  },

  JOBSEEKING: {
    BASE: '/jobseeking',
  },

  HIRES: {
    BASE: '/hires',
  },

  PATIENT: {
    BASE: '/patient',
    DETAIL: (guardianNo) => `/patient?guardian_no=${guardianNo}`,
    PATDETAIL: (patNo) => `/patient?pat_no=${patNo}`,
    PUT: (patNo) => `/patient/${patNo}`,
    DELETE: (patNo) => `/patient/${patNo}`,
  },

  DISEASE: {
    BASE: '/disease',
    DETAIL: (disNo) => `/patients?disNo=${disNo}`,
  },

  RESUME: {
    BASE: '/resume',
  },
  REPORT: {
    BASE: (patNo) => `/report?pat_no=${patNo}`,
  },

  CAREGIVERPROPOSER: {
    BASE: '/caregiverproposer',
    LIST: (job_opening_no) => `/caregiverproposer?caregiverproposer=${job_opening_no}`,
  },
  PATERPROPOSER: {
    BASE: '/resume',
    LIST: (resume_no) => `/patproposer?patproposer=${resume_no}`,
  },
};
