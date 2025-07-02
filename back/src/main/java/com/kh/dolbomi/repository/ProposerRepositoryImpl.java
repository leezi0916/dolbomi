package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Proposer;
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

    // 나의 지원현황 목록
    @Override
    public Page<Proposer> getMyProposerLists(Status status, Pageable pageable, Long userNo) {
        String query = """
                    SELECT p
                    FROM Proposer p
                    WHERE p.caregiver.userNo = :userNo
                    AND p.hiring.status = :status
                    ORDER BY p.proposerDate DESC
                """;
        List<Proposer> proposers = em.createQuery(query, Proposer.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .setFirstResult((int) pageable.getOffset()) // 어디서부터 가지고 올것인가 - OFFSET
                .setMaxResults(pageable.getPageSize())  // 몇개를 가지고 올것인가 - LIMIT
                .getResultList();

        String countQuery = """
                    SELECT count(p)
                    FROM Proposer p
                    WHERE p.caregiver.userNo = :userNo
                    AND p.hiring.status = :status
                """;
        Long totalCount = em.createQuery(countQuery, Long.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .getSingleResult();

        // Page<T> 인터페이스의 기본구현체를 통해서 paging한 정보를 한번에 전달할 수 있음
        // new PageImpl<>(content,pageable,total);
        return new PageImpl<Proposer>(proposers, pageable, totalCount);
    }
}
