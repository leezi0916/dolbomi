// 예시입니다. 저희 프로젝트에 맞게 변경해야 합니다.

const { VITE_JSON_SERVER_URL, VITE_SPRING_URL, VITE_API_TIMEOUT = 5000, VITE_API_VERSION = 'v1' } = import.meta.env;

export const API_CONFIG = {
  BASE_URL: `${VITE_SPRING_URL}`, // Spring 들어가면 여기 변수만 VITE_SPRING_URL로 변경해야함

  // 회원가입 로그인 기능 추가하느라 url 변경함..
  // BASE_URL: `${VITE_SPRING_URL}`,

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
    BASE: '/community/v1',
    LIST: (status, role) => `/community/v1?status=${status}&role=${role}`, // 게시판 리스트 등
    DETAIL: (no) => `/community/v1?no=${no}`, // 특정 게시글
    QUESTION: (status, role, id) => `/community/v1?status=${status}&role=${role}&id=${id}`,
  },

  USERS: {
    BASE: '/users/v1',

    CHECK_ID: '/users/v1/check', //아이디 중복 검사
    PROFILE: (userNo) => `/users/v1?user_no=${userNo}`,
    LOGIN: '/users/v1/login',
    MY: '/users/v1/me',
    //실제에는 이렇게 해야함 아래는 JsonServer 사용시

    // LOGIN: (userId, userPwd) => `/users?user_id=${userId}&user_pwd=${userPwd}`,
    DETAIL: (userId) => `/users/v1?user_id=${userId}`,
    PROFILE_UPDATE: (userNo) => `/users/v1/${userNo}`,
    CAREPROFILE: (userNo) => `/users/v1?user_no=${userNo}`,
  },
  REVIEWS: {
    BASE: '/review/v1',
    SIMPLE_LIST: '/review/v1/simple-list',
    LIST: (currentPage, userNo) => `/review/v1/list?page=${currentPage - 1}&userNo=${userNo}`,
    DETAIL: (userNo) => `/reviews/v1?user_no=${userNo}`,
  },

  HIRING: {
    BASE: '/hiring/v1',
    SIMPLE_LIST: '/hiring/v1/simple-list',
    LIST: '/hiring/v1/list',
    DETAIL: (hiringNo) => `/hiring/v1/${hiringNo}`, //get
    STATUS: (hiringNo) => `/hiring/v1/${hiringNo}/status`,
    DELETE: (hiringNo) => `/hiring/v1/${hiringNo}`, //patch
  },

  RESUME: {
    BASE: '/resume/v1',
    SIMPLE_LIST: '/resume/v1/simple-list',
    LIST: '/resume/v1/list',
    DETAIL: (resumeNo) => `/resume/v1/detail/${resumeNo}`,
    MYRESUME: (userNo) => `/resume/v1/user/${userNo}`,
    UPDATE: (resumeNo) => `/resume/v1/${resumeNo}`,
  },

  PATIENT: {
    BASE: '/patient/v1',
    DETAIL: (guardianNo) => `/patient/v1?guardian_no=${guardianNo}`,
    PATDETAIL: (patNo) => `/patient/v1/${patNo}`,
    PATCH: (patNo) => `/patient/v1/${patNo}`,
  },

  DISEASE: {
    BASE: '/disease/v1',
    DETAIL: (disNo) => `/patients/v1?disNo=${disNo}`,
  },

  REPORT: {
    BASE: `/report/v1`,

    PROFILE: (patNo) => `/report/v1?pat_no=${patNo}`,
    // SEARCH: (reportNo) => `/report/v1/report_no=${reportNo}`,

    LIST: (patNo) => `/report/v1/${patNo}`,
    SEARCH: (reportNo) => `/report/report_no=${reportNo}`,
  },

  PROPOSER: {
    BASE: '/proposer/v1',
    LIST: (hiringNo) => `/proposer/v1?hiring_no=${hiringNo}`,
    CANCEL: (hiringNo, caregiverNo) => `/proposer/v1/${hiringNo}/${caregiverNo}`,
    ACCEPT: '/proposer/v1/accept',
  },

  MATCHING: {
    BASE: '/matching/v1',
    LIST: (patNo, status) => `/matching/v1?pat_no=${patNo}&status=${status}`,
    ENDLIST: (status) => `/matching/v1?status=${status}`,
  },
};
