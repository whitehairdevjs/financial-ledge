package com.financialledge.repository;

import com.financialledge.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    List<Transaction> findByTransactionType(Transaction.TransactionType transactionType);
    
    List<Transaction> findByCategoryId(Long categoryId);
    
    List<Transaction> findByAccountId(Long accountId);
    
    List<Transaction> findByTransactionDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<Transaction> findByTransactionTypeAndCategoryId(Transaction.TransactionType transactionType, Long categoryId);
    
    @Query("SELECT t FROM Transaction t ORDER BY t.transactionDate DESC, t.updatedAt DESC")
    List<Transaction> findAllOrderByTransactionDateDescAndUpdatedAtDesc();
}

