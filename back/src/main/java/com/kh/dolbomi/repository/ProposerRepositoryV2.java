package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Proposer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposerRepositoryV2 extends JpaRepository<Proposer, Integer> {
    List<Proposer> findByHiring_HiringNo(Long hiringNo);
    
    Optional<Proposer> findByHiring_HiringNoAndCaregiver_UserNo(Long hiringNo, Long caregiverNo);

}
