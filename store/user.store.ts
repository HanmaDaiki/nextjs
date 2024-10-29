import { create } from "zustand";
import { config } from "@/config";

export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  name: string;
  surname: string;
  email: string;
  grade: number;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  surname: "",
  email: "",
  grade: 0,
  isLoading: true,
  isAuth: false,
  logout: async () => {
    set({
      isLoading: true,
    });

    await fetch(`${config.apiURL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    set({
      isLoading: false,
      isAuth: false,
    });
  },
  getUser: async () => {
    set({
      isLoading: true,
    });

    const res = await fetch(`${config.apiURL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      set({
        isAuth: true,
        isLoading: false,
        name: data.name,
        surname: data.surname,
        email: data.email,
        grade: data.grade,
      });
    } else {
      set({
        isAuth: false,
        isLoading: false,
        name: "",
        surname: "",
        email: "",
        grade: 0,
      });
    }
  },
}));
