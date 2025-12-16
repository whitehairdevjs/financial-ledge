package com.financialledge.service;

import com.financialledge.entity.Account;
import com.financialledge.entity.User;
import com.financialledge.repository.AccountRepository;
import com.financialledge.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccountService {

    private final AccountRepository accountRepository;
    private final SecurityUtil securityUtil;

    public List<Account> getAllAccounts() {
        Long userId = securityUtil.getCurrentUserId();
        return accountRepository.findByUserId(userId);
    }

    public Account getAccountById(Long id) {
        Long userId = securityUtil.getCurrentUserId();
        return accountRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
    }

    public List<Account> getAccountsByType(Account.AccountType accountType) {
        Long userId = securityUtil.getCurrentUserId();
        return accountRepository.findByUserIdAndAccountType(userId, accountType);
    }

    public List<Account> getActiveAccounts() {
        Long userId = securityUtil.getCurrentUserId();
        return accountRepository.findByUserIdAndIsActiveTrue(userId);
    }

    @Transactional
    public Account createAccount(Account account) {
        User currentUser = securityUtil.getCurrentUser();
        account.setUser(currentUser);
        return accountRepository.save(account);
    }

    @Transactional
    public Account updateAccount(Long id, Account account) {
        Account existingAccount = getAccountById(id);
        existingAccount.setName(account.getName());
        existingAccount.setAccountType(account.getAccountType());
        existingAccount.setBalance(account.getBalance());
        existingAccount.setCurrency(account.getCurrency());
        existingAccount.setDescription(account.getDescription());
        existingAccount.setIsActive(account.getIsActive());
        return accountRepository.save(existingAccount);
    }

    @Transactional
    public void deleteAccount(Long id) {
        Account account = getAccountById(id);
        accountRepository.delete(account);
    }

    @Transactional
    public Account updateBalance(Long id, java.math.BigDecimal newBalance) {
        Account account = getAccountById(id);
        account.setBalance(newBalance);
        return accountRepository.save(account);
    }
}

