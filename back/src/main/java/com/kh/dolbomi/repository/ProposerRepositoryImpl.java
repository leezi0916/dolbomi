package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class ProposerRepositoryImpl implements ProposerRepository {

    @PersistenceContext
    private EntityManager em;


    //내가 신청했는지 안했는지
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

    @Override
    public boolean existsByHiringNoAndCaregiverNo(Long hiringNo, Long caregiverNo) {
        String jpql = "SELECT COUNT(p) FROM Proposer p " +
                "WHERE p.hiring.hiringNo = :hiringNo " +
                "AND p.caregiver.userNo = :caregiverNo ";

        Long count = em.createQuery(jpql, Long.class)
                .setParameter("hiringNo", hiringNo)
                .setParameter("caregiverNo", caregiverNo)
                .getSingleResult();

        return count > 0;
    }

    @Override
    public Optional<Proposer> getProposer(Long caregiverNo, Long hiringNo) {

        String jpql = "SELECT p FROM Proposer p " +
                "WHERE p.hiring.hiringNo = :hiringNo" +
                "AND p.caregiver.userNo = :caregiverNo";

        return Optional.ofNullable(em.createQuery(jpql, Proposer.class)
                .setParameter("hiringNo", hiringNo)
                .setParameter("caregiverNo", caregiverNo)
                .getSingleResult());
    }


}
