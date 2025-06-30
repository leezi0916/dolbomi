package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.enums.StatusEnum;
import java.util.Optional;

public interface ProposerRepository {
    boolean existsByHiringNoAndCaregiverNoAndStatus(Long hiringNo, Long caregiverNo, StatusEnum.Status status);


    boolean existsByHiringNoAndCaregiverNo(Long hiringNo, Long caregiverNo);


    Optional<Proposer> getProposer(Long hiringNo, Long caregiverNo);


    Optional<Proposer> findByHiringNoAndResumeNo(Long hiringNo, Long resumeNo);

}
