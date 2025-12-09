export interface Category {
  id: number;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parent?: Category | null;
  transactionType: "INCOME" | "EXPENSE" | "BOTH";
  createdAt?: string;
  updatedAt?: string;
}

