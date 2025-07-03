package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProposerRepository {
    boolean existsByHiringNoAndCaregiverNoAndStatus(Long hiringNo, Long caregiverNo, StatusEnum.Status status);


    boolean existsByHiringNoAndCaregiverNo(Long hiringNo, Long caregiverNo);


    Optional<Proposer> getProposer(Long hiringNo, Long caregiverNo);


    Optional<Proposer> findByHiringNoAndResumeNo(Long hiringNo, Long resumeNo);

    // 나의 지원현황 목록
    Page<Proposer> getMyProposerLists(Status status, Pageable pageable, Long userNo);

    // 내가 신청한 구인글 찾기
    Optional<Proposer> findHiringByNo(Long proposerNo);
}
