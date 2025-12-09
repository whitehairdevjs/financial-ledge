import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { Account } from "@/types/account";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data } = await apiClient.get<Account[]>("/accounts");
      return data;
    },
  });
};

export const useAccount = (id: number) => {
  return useQuery({
    queryKey: ["accounts", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Account>(`/accounts/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

