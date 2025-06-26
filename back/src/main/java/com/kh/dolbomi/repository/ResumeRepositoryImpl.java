package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class ResumeRepositoryImpl implements ResumeRepository {

    @PersistenceContext
    private EntityManager em;

    // 메인 카드용 구직글 8개 조회 (페이징 없이)
    @Override
    public List<Resume> getMainResumeList(StatusEnum.Status status) {
        String query = "SELECT DISTINCT r FROM Resume r JOIN r.user u LEFT JOIN License l ON l.user = u WHERE r.status = :status ORDER BY r.updateDate DESC";
        return em.createQuery(query, Resume.class)
                .setParameter("status", status)
                .setMaxResults(8)
                .getResultList();
    }

    @Override

    public Page<Resume> findByStatus(StatusEnum.Status status, Pageable pageable) {
        // 1. 페이징된 데이터 조회
        List<Resume> content = em.createQuery(
                        "SELECT r FROM Resume r WHERE r.status = :status ORDER BY r.resumeNo DESC", Resume.class)
                .setParameter("status", status)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // 2. 전체 개수 조회
        Long total = em.createQuery(
                        "SELECT COUNT(r) FROM Resume r WHERE r.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();

        // 3. Page 객체로 변환
        return new PageImpl<>(content, pageable, total);
    }

    public void save(Resume resume) {
        em.persist(resume);
    }

    @Override
    public List<Resume> getResumeList(Long userNo) {

        String query = "SELECT r FROM Resume r  WHERE r.user.userNo = :userNo and r.status <> 'N'";
        return em.createQuery(query, Resume.class)
                .setParameter("userNo", userNo)
                .getResultList();

    }

    
}
