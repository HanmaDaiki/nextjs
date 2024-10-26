import { create } from "zustand";

export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  name: string;
  surname: string;
  email: string;
  grade: number;
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  surname: "",
  email: "",
  grade: 0,
  isLoading: true,
  isAuth: false,
  getUser: async () => {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/auth/login`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      set({
        name: "",
        surname: "",
        email: "",
        grade: 0,
        isAuth: false,
        isLoading: false,
      });
    } else {
      const data = await res.json();
      set({
        name: data.name,
        surname: data.surname,
        email: data.email,
        grade: data.grade,
        isAuth: true,
        isLoading: false,
      });
    }
  },
}));
