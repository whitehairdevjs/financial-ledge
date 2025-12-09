import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { Category } from "@/types/category";
import { TransactionType } from "@/types/transaction";

export const useCategories = (type?: TransactionType) => {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: async () => {
      const endpoint = type
        ? `/categories/type/${type}`
        : "/categories";
      const { data } = await apiClient.get<Category[]>(endpoint);
      return data;
    },
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Category>(`/categories/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

