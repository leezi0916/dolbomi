package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MatchingRepository {

    Optional<Matching> findByMetNo(Long matNo);

    Matching save(Matching matching);

    Page<Matching> findByCheckList(Long patNo, Status status, Status userStatus, Pageable pageable);

}
