package com.kh.dolbomi.repository;

import com.kh.dolbomi.entity.Hiring;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class HiringRepositoryImpl implements HiringRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(Hiring hiring) {
        em.persist(hiring);
    }

    @Override
    public Hiring findByHiringNo(Long hiringNo) {
        return null;
    }

    @Override
    public Optional<Hiring> findById(Long hiringNo) {
        Hiring hiring = em.find(Hiring.class, hiringNo);
        return Optional.ofNullable(hiring);
    }

    @Override
    public List<Hiring> findByUserNo(Long userNo) {
        return em.createQuery(
                        "SELECT h FROM Hiring h " +
                                "JOIN h.user u " +
                                "WHERE u.userNo = :userNo", Hiring.class)
                .setParameter("userNo", userNo)
                .getResultList();
    }
}
