import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      userStatus: false,
      isAuthenticated: false,

      //상태변화
      setUserStatus: () =>
        set((state) => ({
          userStatus: !state.userStatus,
        })),

      //로그인
      login: (userData) => {
        console.log(userData)

        set({
          user: {
            user_no: userData.user_no,
            user_id: userData.user_id,
            user_name: userData.user_name,
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
