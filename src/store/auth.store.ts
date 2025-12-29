import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token'),
  laoding: false,
  login: (token: string) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null });
  }
}));
