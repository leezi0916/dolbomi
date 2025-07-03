package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import java.util.Optional;

public interface MatchingRepository {

    Optional<Matching> findByMetNo(Long matNo);

    Matching save(Matching matching);
}
