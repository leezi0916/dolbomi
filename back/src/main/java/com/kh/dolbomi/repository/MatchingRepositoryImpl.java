package com.kh.dolbomi.repository;

import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class MatchingRepositoryImpl implements MatchingRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Object[]> findbyPatNo(Long patNo, StatusEnum.Status matchingStatus) {
//        String query = """
//                SELECT m , u.age , u.gender
//                FROM Matching m
//                JOIN m.caregiver u
//                WHERE m.patient.patNo = :patNo
//                AND m.status = :matchingStatus""";
//
//        List<Matching> resultList = em.createQuery(query, Matching.class)
//                .setParameter("patNo", patNo)
//                .setParameter("matchingStatus", matchingStatus)
//                .getResultList();

        String query =
                "SELECT r.matNo, u.userName, u.age, r.startDate "
                        + "FROM Matching r JOIN r.caregiver u " +
                        "WHERE r.status = 'Y' AND p.patNo = :patNo ";

        return em.createQuery(query, Object[].class)
                .setParameter("patNo", patNo)
                .setParameter("matchingStatus", matchingStatus)
                .getResultList();
    }


}

