import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      // 간병인= false/ 돌봄대상자 = true
      userStatus: false,

      isAuthenticated: false,

      // 간병인= false/ 돌봄대상자 = true
      setUserStatus: () =>
        set((state) => ({
          userStatus: !state.userStatus,
        })),

      //로그인
      login: (userData) => {
        set({
          user: {
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
      //storage: localStorage, //기본값
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
