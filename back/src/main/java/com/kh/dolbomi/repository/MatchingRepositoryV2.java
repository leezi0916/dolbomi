package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingRepositoryV2 extends JpaRepository<Matching, Long> {
    // 특별한 쿼리는 필요 없지만 필요하면 여기에 추가
    // 지우지 마세요!!!!


    // 매칭진행중 : 특정환자에 대한 간병인 목록가져오기
    List<Matching> findByPatientPatNoAndStatus(Long patNo, Status status);

    // 매칭진행중 : 특정간병인 대한 환자 목록가져오기
    List<Matching> findByCaregiverUserNoAndStatus(Long caregiverNo, Status status);


    Page<Matching> findByPatientPatNoAndStatus(Long patNo, Status status, Pageable pageable);

    Page<Matching> findByCaregiverUserNoAndStatus(Long caregiverNo, Status status, Pageable pageable);


}
