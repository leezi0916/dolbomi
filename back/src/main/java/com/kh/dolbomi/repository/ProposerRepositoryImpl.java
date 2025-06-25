package com.kh.dolbomi.repository;

import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class ProposerRepositoryImpl implements ProposerRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public boolean existsByHiringNoAndCaregiverNoAndStatus(Long hiringNo, Long caregiverNo, Status status) {
        String jpql = "SELECT COUNT(p) FROM Proposer p " +
                "WHERE p.hiring.hiringNo = :hiringNo " +
                "AND p.caregiver.userNo = :caregiverNo " +
                "AND p.status = :status";

        Long count = em.createQuery(jpql, Long.class)
                .setParameter("hiringNo", hiringNo)
                .setParameter("caregiverNo", caregiverNo)
                .setParameter("status", status)
                .getSingleResult();

        return count > 0;
    }
}
