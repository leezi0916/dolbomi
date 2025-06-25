package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewRepositoryImpl implements ReviewRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Review> getMainReviewList(StatusEnum.Status status) {
        String query = "SELECT DISTINCT r FROM Review r JOIN r.writer u WHERE r.status = :status";
        return em.createQuery(query, Review.class)
                .setParameter("status", status)
                .setMaxResults(3)
                .getResultList();
    }
}
