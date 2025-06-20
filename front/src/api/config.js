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
    BASE: '/community',
    LIST: (status, role) => `/community?status=${status}&role=${role}`, // 게시판 리스트 등
    DETAIL: (no) => `/community?no=${no}`, // 특정 게시글
    QUESTION: (status, role, id) => `/community?status=${status}&role=${role}&id=${id}`,
  },

  USERS: {
    BASE: '/users',

    PROFILE: (userId) => `/users?user_id=${userId}`,

    // LOGIN: '/users/login' //실제에는 이렇게 해야함 아래는 JsonServer 사용시
    LOGIN: (userId, userPwd) => `/users?user_id=${userId}&user_pwd=${userPwd}`,
    DETAIL: (userId) => `/users?user_id=${userId}`,
    PROFILE_UPDATE: (userId) => `/users/${userId}`,
  },
  REVIEWS: {
    BASE: '/reviews',
    DETAIL: (userNo) => `/reviews?user_no=${userNo}`,
  },
  HIRING: {
    BASE: '/hiring',
    DETAIL: (hiringNo) => `/hiring?hiring_no=${hiringNo}`,
  },

  RESUME: {
    BASE: '/resume',
    DETAIL: (resumeNo) => `/resume?resume_no=${resumeNo}`,
    MYRESUME: (userNo) => `resume?user_no=${userNo}`,
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

  REPORT: {
    BASE: `/report`,
    PROFILE: (patNo) => `/report?pat_no=${patNo}`,
    SEARCH: (reportNo) => `/report?report_no=${reportNo}`,
  },

  CAREGIVERPROPOSER: {
    BASE: '/caregiverproposer',
    LIST: (hiringNo) => `/caregiverproposer?hiring_no=${hiringNo}`,
  },
  PATERPROPOSER: {
    BASE: '/patproposer',
    LIST: (resumeNo) => `/patproposer?resume_no=${resumeNo}`,
  },
};
