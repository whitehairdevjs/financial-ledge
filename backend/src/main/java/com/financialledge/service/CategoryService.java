package com.financialledge.service;

import com.financialledge.entity.Category;
import com.financialledge.entity.User;
import com.financialledge.repository.CategoryRepository;
import com.financialledge.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final SecurityUtil securityUtil;

    public List<Category> getAllCategories() {
        Long userId = securityUtil.getCurrentUserId();
        return categoryRepository.findByUserId(userId);
    }

    public Category getCategoryById(Long id) {
        Long userId = securityUtil.getCurrentUserId();
        return categoryRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    public List<Category> getCategoriesByType(Category.TransactionType type) {
        Long userId = securityUtil.getCurrentUserId();
        return categoryRepository.findByUserIdAndTransactionType(userId, type);
    }

    public List<Category> getCategoriesByParentId(Long parentId) {
        Long userId = securityUtil.getCurrentUserId();
        return categoryRepository.findByUserIdAndParentId(userId, parentId);
    }

    public List<Category> getRootCategories() {
        Long userId = securityUtil.getCurrentUserId();
        return categoryRepository.findByUserIdAndParentIsNull(userId);
    }

    @Transactional
    public Category createCategory(Category category) {
        Long userId = securityUtil.getCurrentUserId();
        if (categoryRepository.findByUserIdAndName(userId, category.getName()).isPresent()) {
            throw new RuntimeException("Category with name '" + category.getName() + "' already exists");
        }
        User currentUser = securityUtil.getCurrentUser();
        category.setUser(currentUser);
        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = getCategoryById(id);
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setColor(category.getColor());
        existingCategory.setIcon(category.getIcon());
        existingCategory.setParent(category.getParent());
        existingCategory.setTransactionType(category.getTransactionType());
        return categoryRepository.save(existingCategory);
    }

    @Transactional
    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}

