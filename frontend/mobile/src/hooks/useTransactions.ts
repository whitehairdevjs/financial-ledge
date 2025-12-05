import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import apiClient from '../lib/api';
import {Transaction} from '../types/transaction';

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const {data} = await apiClient.get<Transaction[]>('/transactions');
      return data;
    },
  });
};

export const useTransaction = (id: number) => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: async () => {
      const {data} = await apiClient.get<Transaction>(`/transactions/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: Omit<Transaction, 'id'>) => {
      const {data} = await apiClient.post<Transaction>(
        '/transactions',
        transaction,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['transactions']});
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      transaction,
    }: {
      id: number;
      transaction: Partial<Transaction>;
    }) => {
      const {data} = await apiClient.put<Transaction>(
        `/transactions/${id}`,
        transaction,
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['transactions']});
      queryClient.invalidateQueries({
        queryKey: ['transactions', variables.id],
      });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['transactions']});
    },
  });
};

