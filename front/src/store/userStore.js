import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      //로그인
      login: (userData) => {

        set({
          user: {
            userNo: userData.userNo,
            userId: userData.userId,
            userName: userData.userName,
          },
          isAuthenticated: true,
        });
      },

      //로그아웃
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'user-storage',
      // storage: localStorage, //기본값
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
