package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Role;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class BoardRepositoryImpl implements BoardRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Board> findByStatus(StatusEnum.Status status, StatusEnum.Role role, String option, String keyword,
                                    Pageable pageable) {
        // 기본 SELECT 쿼리: 상태와 역할로 필터링
        String baseQuery = "SELECT b FROM Board b WHERE b.status = :status AND b.role = :role";
        // COUNT 쿼리: 전체 개수 구할 때 사용
        String countQuery = "SELECT COUNT(b) FROM Board b WHERE b.status = :status AND b.role = :role";

        // keyword가 비어있지 않다면, 제목 또는 내용에 해당 키워드가 포함된 게시글을 검색
        if (keyword != null && !keyword.trim().isEmpty()) {
            baseQuery += " AND (b.boardTitle LIKE :keyword OR b.boardContent LIKE :keyword)";
            countQuery += " AND (b.boardTitle LIKE :keyword OR b.boardContent LIKE :keyword)";
        }

        // 정렬 조건 추가
        if ("createDate".equals(option.trim())) {
            baseQuery += " ORDER BY b.createDate DESC";
        } else if ("count".equals(option.trim())) {
            baseQuery += " ORDER BY b.count DESC";
        }

        // 실제 게시글 리스트 쿼리 생성
        var query = em.createQuery(baseQuery, Board.class)
                .setParameter("status", status)
                .setParameter("role", role)
                .setFirstResult((int) pageable.getOffset()) // 페이지 시작 위치
                .setMaxResults(pageable.getPageSize());     // 한 페이지당 개수

        // 전체 게시글 수 카운트 쿼리 생성
        var count = em.createQuery(countQuery, Long.class)
                .setParameter("status", status)
                .setParameter("role", role);

        // keyword가 있을 경우, 패턴으로 LIKE 조건 바인딩
        if (keyword != null && !keyword.trim().isEmpty()) {
            String pattern = "%" + keyword + "%";
            query.setParameter("keyword", pattern);
            count.setParameter("keyword", pattern);
        }

        // 결과 조회
        List<Board> content = query.getResultList(); // 실제 게시글 리스트
        Long total = count.getSingleResult();        // 전체 개수

        // 1. 페이징된 데이터 조회
//        List<Board> content = em.createQuery(
//                        "SELECT b FROM Board b WHERE b.status = :status AND b.role = :role ORDER BY b.boardNo DESC",
//                        Board.class)
//                .setParameter("status", status)
//                .setParameter("role", role)
//                .setFirstResult((int) pageable.getOffset())
//                .setMaxResults(pageable.getPageSize())
//                .getResultList();

        // 2. 전체 개수 조회
//        Long total = em.createQuery(
//                        "SELECT COUNT(b) FROM Board b WHERE b.status = :status AND b.role = :role", Long.class)
//                .setParameter("status", status)
//                .setParameter("role", role)
//                .getSingleResult();

        // Page 객체로 변환
        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Page<Board> findByUserNo(Status status, Role role, Long userNo, Pageable pageable) {
        // 1. 페이징된 데이터 조회
        List<Board> content = em.createQuery(
                        "SELECT b FROM Board b WHERE b.status = :status AND b.role = :role AND b.user.userNo = :userNo ORDER BY b.createDate DESC",
                        Board.class)
                .setParameter("status", status)
                .setParameter("role", role)
                .setParameter("userNo", userNo)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // 2. 전체 개수 조회
        Long total = em.createQuery(
                        "SELECT COUNT(b) FROM Board b WHERE b.status = :status AND b.role = :role AND b.user.userNo = :userNo",
                        Long.class)
                .setParameter("status", status)
                .setParameter("role", role)
                .setParameter("userNo", userNo)
                .getSingleResult();

        // 3. Page 객체로 변환
        return new PageImpl<>(content, pageable, total);

    }

    @Override
    public Optional<Board> findByBoardNo(Long boardNo) {
        if (boardNo == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(em.find(Board.class, boardNo));
    }


}
