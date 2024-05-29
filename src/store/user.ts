import { FormData as SignUpData } from "@/components/pages/signup/SignUp";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  userData: SignUpData | null;
  setUserData: (data: SignUpData | null) => void;
  clearUserData: () => void;
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
