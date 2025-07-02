package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.enums.StatusEnum;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposerRepositoryV2 extends JpaRepository<Proposer, Integer> {
    List<Proposer> findByHiring_HiringNo(Long hiringNo);

    Optional<Proposer> findByHiring_HiringNoAndCaregiver_UserNo(Long hiringNo, Long caregiverNo);

    boolean existsByResume_ResumeNoAndHiring_HiringNoAndStatus(Long resumeNo, Long hiringNo, StatusEnum.Status status);

    //수락 상태인 신청번호 count
    int countByHiringAndStatus(Hiring hiring, StatusEnum.Status status);
}
