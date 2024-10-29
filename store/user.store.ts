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
      isLoading: true
    })

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
    const res = await fetch(`${config.apiURL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
