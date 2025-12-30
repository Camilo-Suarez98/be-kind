import { create } from 'zustand';
import { http } from '../api/http';

export interface Category {
  color: string | undefined;
  id: number;
  name: string;
  icon: any;
  description: string;
  status: number;
  createdAt: string;
}

interface CategoriesState {
  items: Category[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchCategories: (page: number, pageSize: number) => Promise<void>;
  addCategory: (data: Partial<Category>) => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  items: [],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
  loading: false,
  error: null,
  fetchCategories: async (page, pageSize) => {
    set({ loading: true, error: null });

    try {
      const res = await http<any>(
        `https://dev.api.bekindnetwork.com/api/v1/actions/admin-list?pageNumber=${page}&pageSize=${pageSize}`
      );
      console.log('res', res);

      set({
        items: res.data.data ?? [],
        pageNumber: res.data.pageNumber,
        pageSize: res.data.pageSize,
        totalElements: res.data.totalElements ?? 0,
        totalPages: res.data.totalPages ?? 0,
        loading: false,
      });
    } catch {
      set({
        error: 'Error cargando categorías',
        loading: false,
      });
    }
  },

  addCategory: async (data: any) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('status', data.status);
      formData.append('color', data.color);

      if (data.icon && data.icon instanceof FileList && data.icon.length > 0) {
        formData.append('icon', data.icon[0]);
      } else if (data.icon instanceof File) {
        formData.append('icon', data.icon);
      }

      await http(
        'https://dev.api.bekindnetwork.com/api/v1/actions/admin-add',
        {
          method: 'POST',
          body: formData,
        }
      );
      await get().fetchCategories(1, get().pageSize);
    } catch (error) {
      set({ loading: false, error: 'Error agregando categoría' });
      throw error;
    }
  }
}));
