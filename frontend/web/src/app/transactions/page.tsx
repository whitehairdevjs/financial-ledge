"use client";

import { useTransactions } from "@/hooks/useTransactions";
import TransactionsTable from "@/components/TransactionsTable";

export default function TransactionsPage() {
  const { data: transactions, isLoading, error } = useTransactions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">
          Error loading transactions: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <TransactionsTable data={transactions || []} />
    </div>
  );
}

