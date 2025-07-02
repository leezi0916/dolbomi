package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.List;
import java.util.Optional;

public interface MatchingRepository {
    List<Object[]> findbyPatNo(Long patNo, StatusEnum.Status matchingStatus);

    List<Object[]> findbyCaregiverNo(Long cargiverNo, Status matchingStatus);

    Optional<Matching> findByMetNo(Long matNo);

    Matching save(Matching matching);
}
