package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class BoardRepositoryImpl implements BoardRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Board> findByStatus(StatusEnum.Status status, StatusEnum.Role role, Pageable pageable) {
        // 1. 페이징된 데이터 조회
        List<Board> content = em.createQuery(
                        "SELECT b FROM Board b WHERE b.status = :status AND b.role = :role ORDER BY b.boardNo DESC",
                        Board.class)
                .setParameter("status", status)
                .setParameter("role", role)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // 2. 전체 개수 조회
        Long total = em.createQuery(
                        "SELECT COUNT(b) FROM Board b WHERE b.status = :status AND b.role = :role", Long.class)
                .setParameter("status", status)
                .setParameter("role", role)
                .getSingleResult();

        // 3. Page 객체로 변환
        return new PageImpl<>(content, pageable, total);
    }
}
