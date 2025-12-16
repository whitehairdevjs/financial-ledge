package com.financialledge.service;

import com.financialledge.entity.Tag;
import com.financialledge.entity.User;
import com.financialledge.repository.TagRepository;
import com.financialledge.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TagService {

    private final TagRepository tagRepository;
    private final SecurityUtil securityUtil;

    public List<Tag> getAllTags() {
        Long userId = securityUtil.getCurrentUserId();
        return tagRepository.findByUserId(userId);
    }

    public Tag getTagById(Long id) {
        Long userId = securityUtil.getCurrentUserId();
        return tagRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
    }

    @Transactional
    public Tag createTag(Tag tag) {
        Long userId = securityUtil.getCurrentUserId();
        if (tagRepository.findByUserIdAndName(userId, tag.getName()).isPresent()) {
            throw new RuntimeException("Tag with name '" + tag.getName() + "' already exists");
        }
        User currentUser = securityUtil.getCurrentUser();
        tag.setUser(currentUser);
        return tagRepository.save(tag);
    }

    @Transactional
    public Tag updateTag(Long id, Tag tag) {
        Tag existingTag = getTagById(id);
        existingTag.setName(tag.getName());
        existingTag.setColor(tag.getColor());
        return tagRepository.save(existingTag);
    }

    @Transactional
    public void deleteTag(Long id) {
        Tag tag = getTagById(id);
        tagRepository.delete(tag);
    }
}

