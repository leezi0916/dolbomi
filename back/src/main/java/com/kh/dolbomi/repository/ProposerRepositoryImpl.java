package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
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


    //신청 테이블에서 구인번호와 이력서 번호로 조회하기
    @Override
    public Optional<Proposer> findByHiringNoAndResumeNo(Long hiringNo, Long resumeNo) {
        List<Proposer> resultList = em.createQuery(
                        "SELECT p FROM Proposer p WHERE p.hiring.hiringNo = :hiringNo AND p.resume.resumeNo = :resumeNo",
                        Proposer.class)
                .setParameter("hiringNo", hiringNo)
                .setParameter("resumeNo", resumeNo)
                .getResultList();

        if (resultList.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(resultList.get(0));
    }


}
