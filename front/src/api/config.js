// 예시입니다. 저희 프로젝트에 맞게 변경해야 합니다.

const { VITE_JSON_SERVER_URL, VITE_SPRING_URL, VITE_API_TIMEOUT = 5000, VITE_API_VERSION = 'v1' } = import.meta.env;

export const API_CONFIG = {
  BASE_URL: `${VITE_SPRING_URL}`, // Spring 들어가면 여기 변수만 VITE_SPRING_URL로 변경해야함
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
    CAREGIVER: `/community/v1/caregiver`,
    GUARDIAN: `/community/v1/guardian`,
    DETAIL: (boardNo) => `/community/v1/detail?board_no=${boardNo}`, // 특정 게시글
    REPLY: `/community/v1/reply`,
    QUESTION: `/community/v1/question`,
    QUESTION_HISTORY: (userNo) => `/community/v1/question?user_no=${userNo}`,

    CREATE: (role) => `/community/v1/${role}/create`,
  },

  USERS: {
    BASE: '/users/v1',
    CHECK_ID: '/users/v1/check', //아이디 중복 검사
    PROFILE: (userNo) => `/users/v1?user_no=${userNo}`,
    LOGIN: '/users/v1/login',
    MY: '/users/v1/me',
    DETAIL: (userId) => `/users/v1?user_id=${userId}`,
    PROFILE_UPDATE: (userNo) => `/users/v1/${userNo}`,
    CAREPROFILE: (userNo) => `/users/v1?user_no=${userNo}`,
    DELETE: (userNo) => `/users/v1/${userNo}/delete`,
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
    MYLIST: (currentPage, userNo) => `/hiring/v1/my-list?page=${currentPage - 1}&userNo=${userNo}`,
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
    LIST: (patNo) => `/report/v1/${patNo}`,
    SEARCH: (reportNo) => `/report/v1/detail/${reportNo}`,
  },

  PROPOSER: {
    BASE: '/proposer/v1',
    LIST: (hiringNo) => `/proposer/v1?hiring_no=${hiringNo}`,
    MYLIST: (currentPage, userNo) => `/proposer/v1/my-list?page=${currentPage - 1}&userNo=${userNo}`,
    STATUS: (hiringNo, caregiverNo) => `/proposer/v1/check?hiring_no=${hiringNo}&caregiver_no=${caregiverNo}`,
    CANCEL: (hiringNo, caregiverNo) => `/proposer/v1/cancel?hiring_no=${hiringNo}&caregiver_no=${caregiverNo}`,
    ACCEPT: '/proposer/v1/accept',
    CHECK_ACCEPTED: (hiringNo, resumeNo) => `/proposer/v1/accept/check?hiring_no=${hiringNo}&resume_no=${resumeNo}`,
  },

  MATCHING: {
    BASE: '/matching/v1',
    LIST: (patNo, status) => `/matching/v1?pat_no=${patNo}&status=${status}`,

    ENDLIST: (patNo, status) => `/matching/v1/matched?pat_no=${patNo}&status=${status}`,
    PATLIST: (caregiverNo, status) => `/matching/v1/caregiver?caregiver_no=${caregiverNo}&status=${status}`,
    PAT_ENDLIST: (caregiverNo, status) => `/matching/v1/caregiver/matched?caregiver_no=${caregiverNo}&status=${status}`,
  },

  API: {
    BASE: '/api/address',
    REGION: (cd) => {
      return cd != null ? `/api/address/region?cd=${cd}` : `/api/address/region`;
    },
  },
};
