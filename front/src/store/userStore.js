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
          user: userData,
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

      //회원 정보 수정시 바로 반영 (헤더에있는 이름)
      setUser: (userData) => set({ user: userData }),
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
