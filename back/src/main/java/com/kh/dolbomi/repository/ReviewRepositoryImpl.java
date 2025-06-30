package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewRepositoryImpl implements ReviewRepository {

    @PersistenceContext
    private EntityManager em;

    // 메인(보호자 메인) 리뷰 조회
    @Override
    public List<Review> getMainReviewList(StatusEnum.Status status) {
        String query = "SELECT DISTINCT r FROM Review r JOIN r.writer u WHERE r.status = :status ORDER BY r.updateDate DESC";
        return em.createQuery(query, Review.class)
                .setParameter("status", status)
                .setMaxResults(3)
                .getResultList();
    }

    // 내가쓴 리뷰 조회
    @Override
    public Page<Review> getMyWrittenReviewList(Status status, Pageable pageable, Long userNo) {
        String query = """
                  SELECT r 
                  FROM Review r
                  JOIN r.matchingList m
                  JOIN m.caregiver c
                  WHERE r.status = :status AND r.writer.userNo = :userNo
                """;
        List<Review> reviews = em.createQuery(query, Review.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .setFirstResult((int) pageable.getOffset()) // 어디서부터 가지고 올것인가 - OFFSET
                .setMaxResults(pageable.getPageSize())  // 몇개를 가지고 올것인가 - LIMIT
                .getResultList();

        String countQuery = """
                  SELECT count(r)
                  FROM Review r
                  JOIN r.matchingList m
                  JOIN m.caregiver c
                  WHERE r.status = :status AND r.writer.userNo = :userNo
                """;
        Long totalCount = em.createQuery(countQuery, Long.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .getSingleResult();

        // Page<T> 인터페이스의 기본구현체를 통해서 paging한 정보를 한번에 전달할 수 있음
        // new PageImpl<>(content,pageable,total);
        return new PageImpl<Review>(reviews, pageable, totalCount);
    }

    // 내가 받은 리뷰 조회
    @Override
    public Page<Review> getReceivedReviewList(Status status, Pageable pageable, Long userNo) {

        String query = """
                  SELECT r
                  FROM Review r
                  JOIN r.matchingList m
                  JOIN m.caregiver c
                  WHERE r.status = :status AND c.userNo = :userNo
                """;
        List<Review> reviews = em.createQuery(query, Review.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .setFirstResult((int) pageable.getOffset()) // 어디서부터 가지고 올것인가 - OFFSET
                .setMaxResults(pageable.getPageSize())  // 몇개를 가지고 올것인가 - LIMIT
                .getResultList();

        String countQuery = """
                SELECT count(r)
                  FROM Review r
                  JOIN r.matchingList m
                  JOIN m.caregiver c
                  WHERE r.status = :status AND c.userNo = :userNo
                """;

        Long totalCount = em.createQuery(countQuery, Long.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .getSingleResult();

        // Page<T> 인터페이스의 기본구현체를 통해서 paging한 정보를 한번에 전달할 수 있음
        // new PageImpl<>(content,pageable,total);
        return new PageImpl<Review>(reviews, pageable, totalCount);
    }
}
