package com.financialledge.service;

import com.financialledge.entity.Budget;
import com.financialledge.entity.User;
import com.financialledge.repository.BudgetRepository;
import com.financialledge.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final SecurityUtil securityUtil;

    public List<Budget> getAllBudgets() {
        Long userId = securityUtil.getCurrentUserId();
        return budgetRepository.findByUserId(userId);
    }

    public Budget getBudgetById(Long id) {
        Long userId = securityUtil.getCurrentUserId();
        return budgetRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Budget not found with id: " + id));
    }

    public List<Budget> getBudgetsByCategoryId(Long categoryId) {
        Long userId = securityUtil.getCurrentUserId();
        return budgetRepository.findByUserIdAndCategoryId(userId, categoryId);
    }

    public List<Budget> getBudgetsByAccountId(Long accountId) {
        Long userId = securityUtil.getCurrentUserId();
        return budgetRepository.findByUserIdAndAccountId(userId, accountId);
    }

    public List<Budget> getActiveBudgets() {
        Long userId = securityUtil.getCurrentUserId();
        return budgetRepository.findByUserIdAndIsActiveTrue(userId);
    }

    public List<Budget> getBudgetsByPeriodType(Budget.PeriodType periodType) {
        Long userId = securityUtil.getCurrentUserId();
        return budgetRepository.findByUserIdAndPeriodType(userId, periodType);
    }

    @Transactional
    public Budget createBudget(Budget budget) {
        User currentUser = securityUtil.getCurrentUser();
        budget.setUser(currentUser);
        return budgetRepository.save(budget);
    }

    @Transactional
    public Budget updateBudget(Long id, Budget budget) {
        Budget existingBudget = getBudgetById(id);
        existingBudget.setCategory(budget.getCategory());
        existingBudget.setAccount(budget.getAccount());
        existingBudget.setAmount(budget.getAmount());
        existingBudget.setPeriodType(budget.getPeriodType());
        existingBudget.setStartDate(budget.getStartDate());
        existingBudget.setEndDate(budget.getEndDate());
        existingBudget.setIsActive(budget.getIsActive());
        return budgetRepository.save(existingBudget);
    }

    @Transactional
    public void deleteBudget(Long id) {
        Budget budget = getBudgetById(id);
        budgetRepository.delete(budget);
    }
}

