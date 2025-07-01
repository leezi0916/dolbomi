package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class MatchingRepositoryImpl implements MatchingRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Object[]> findbyPatNo(Long patNo, StatusEnum.Status matchingStatus) {
        String query = """
                SELECT m.matNo , u.userNo, u.userName , u.age , u.gender, m.startDate, m.status
                FROM Matching m
                JOIN m.caregiver u
                WHERE m.patient.patNo = :patNo
                AND m.status = :matchingStatus""";

        return em.createQuery(query, Object[].class)
                .setParameter("patNo", patNo)
                .setParameter("matchingStatus", matchingStatus)
                .getResultList();
    }

    @Override
    public List<Object[]> findbyCaregiverNo(Long caregiverNo, Status matchingStatus) {
        String query = """
                    SELECT m.matNo, p.patName, p.patAge, p.patGender, m.startDate, m.status
                    FROM Matching m
                    JOIN m.patient p
                    WHERE m.status = :matchingStatus
                    AND m.caregiver.userNo = :caregiverNo
                """;

        return em.createQuery(query, Object[].class)
                .setParameter("matchingStatus", matchingStatus)
                .setParameter("caregiverNo", caregiverNo)
                .getResultList();
    }

    @Override
    public Optional<Matching> findByMetNo(Long matNo) {
        return Optional.ofNullable(em.find(Matching.class, matNo));
    }

    @Override
    public Matching save(Matching matching) {
        em.persist(matching);
        return matching;
    }


}

