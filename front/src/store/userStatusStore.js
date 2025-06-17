import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStatusStore = create(
  persist(
    (set) => ({
      userStatus: false,

      // 간병인은 false / 보호자는 ture
      setUserStatus: (status) =>
        set(() => ({
          userStatus: status,
        })),
    }),
    {
      name: 'status-storage',
      // storage: localStorage, //기본값
      partialize: (state) => ({
        userStatus: state.userStatus,
      }),
    }
  )
);

export default useUserStatusStore;
