package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Optional;
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


}

