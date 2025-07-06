package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class MatchingRepositoryImpl implements MatchingRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Optional<Matching> findByMetNo(Long matNo) {
        return Optional.ofNullable(em.find(Matching.class, matNo));
    }

    @Override
    public Matching save(Matching matching) {
        em.persist(matching);
        return matching;
    }

    @Override
    public Page<Matching> findByCheckList(Long patNo, Status status, Status userStatus, Pageable pageable) {
        String query =
                "SELECT m FROM Matching m "
                        + "WHERE m.patient.patNo = :patNo "
                        + "AND m.status = :status "
                        + "AND m.caregiver.status = :userStatus";

        List<Matching> matchingList = em.createQuery(query, Matching.class)
                .setParameter("patNo", patNo)
                .setParameter("status", status)
                .setParameter("userStatus", userStatus)
                .setFirstResult((int) pageable.getOffset()) // 어디서부터 가지고 올것인가 - OFFSET
                .setMaxResults(pageable.getPageSize())  // 몇개를 가지고 올것인가 - LIMIT
                .getResultList();

        return new PageImpl<Matching>(matchingList, pageable, matchingList.size());

    }

    @Override
    public Page<Matching> findBySearchDateList(Long patNo, LocalDateTime startDate, LocalDateTime endDate,
                                               Status status, Pageable pageable) {

        String query = "SELECT m FROM Matching m "
                + "WHERE m.startDate >= :startDate "
                + "AND m.endDate <= :endDate "
                + "AND m.patient.patNo = :patNo "
                + "AND m.status = :status";

        //리펙토링 필요함
        List<Matching> listTest = em.createQuery(query, Matching.class)
                .setParameter("patNo", patNo)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .setParameter("status", status)
                .getResultList();

        List<Matching> matchingList = em.createQuery(query, Matching.class)
                .setParameter("patNo", patNo)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .setParameter("status", status)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        System.out.println("repository : " + listTest.size());

        return new PageImpl<>(matchingList, pageable, listTest.size());
    }


}

