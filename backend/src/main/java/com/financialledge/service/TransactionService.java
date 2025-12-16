package com.financialledge.service;

import com.financialledge.entity.Transaction;
import com.financialledge.entity.User;
import com.financialledge.repository.TransactionRepository;
import com.financialledge.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final SecurityUtil securityUtil;

    public List<Transaction> getAllTransactions() {
        Long userId = securityUtil.getCurrentUserId();
        return transactionRepository.findByUserIdOrderByTransactionDateDescAndUpdatedAtDesc(userId);
    }

    public Transaction getTransactionById(Long id) {
        Long userId = securityUtil.getCurrentUserId();
        return transactionRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    public List<Transaction> getTransactionsByType(Transaction.TransactionType type) {
        Long userId = securityUtil.getCurrentUserId();
        return transactionRepository.findByUserIdAndTransactionType(userId, type);
    }

    public List<Transaction> getTransactionsByCategoryId(Long categoryId) {
        Long userId = securityUtil.getCurrentUserId();
        return transactionRepository.findByUserIdAndCategoryId(userId, categoryId);
    }

    public List<Transaction> getTransactionsByAccountId(Long accountId) {
        Long userId = securityUtil.getCurrentUserId();
        return transactionRepository.findByUserIdAndAccountId(userId, accountId);
    }

    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        User currentUser = securityUtil.getCurrentUser();
        transaction.setUser(currentUser);
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction updateTransaction(Long id, Transaction transaction) {
        Transaction existingTransaction = getTransactionById(id);
        existingTransaction.setTransactionDate(transaction.getTransactionDate());
        existingTransaction.setDescription(transaction.getDescription());
        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setTransactionType(transaction.getTransactionType());
        existingTransaction.setCategory(transaction.getCategory());
        existingTransaction.setAccount(transaction.getAccount());
        existingTransaction.setTargetAccount(transaction.getTargetAccount());
        existingTransaction.setNotes(transaction.getNotes());
        return transactionRepository.save(existingTransaction);
    }

    @Transactional
    public void deleteTransaction(Long id) {
        Transaction transaction = getTransactionById(id);
        transactionRepository.delete(transaction);
    }
}

