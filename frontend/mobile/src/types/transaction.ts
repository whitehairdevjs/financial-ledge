export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}

export interface Transaction {
  id?: number;
  transactionDate: string;
  description: string;
  amount: number;
  transactionType: TransactionType;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

