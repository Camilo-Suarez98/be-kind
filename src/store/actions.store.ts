import { create } from "zustand";
import { http } from "../api/http";

interface Action {
  id: string;
  name: string;
  status: string;
}

interface ActionsStore {
  actions: Action[];
  loading: boolean;
  fetchActions: (page: number) => void;
}

export const useActionsStore = create<ActionsStore>((set) => ({
  actions: [],
  loading: false,
  fetchActions: async (page) => {
    set({ loading: true });
    const res = await http<any>(
      `https://dev.api.bekindnetwork.com/api/v1/actions/admin-list?pageNumber=${page}&pageSize=10`
    );
    set({ actions: res.items, loading: false });
  },
}));
