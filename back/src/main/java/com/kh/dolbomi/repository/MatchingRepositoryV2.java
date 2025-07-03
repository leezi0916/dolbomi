package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MatchingRepositoryV2 extends JpaRepository<Matching, Long> {
    // 특별한 쿼리는 필요 없지만 필요하면 여기에 추가
    // 지우지 마세요!!!!

    Page<Matching> findByPatientPatNoAndStatus(Long patNo, Status status, Pageable pageable);

    Page<Matching> findByCaregiverUserNoAndStatus(Long caregiverNo, Status status, Pageable pageable);

    @Query("SELECT m.review FROM Matching m WHERE m.caregiver.userNo = :caregiverNo AND m.review IS NOT NULL AND m.review.status = :status ORDER BY m.review.updateDate DESC")
    Page<Review> findReviewsByCaregiverAndStatus(@Param("caregiverNo") Long caregiverNo,
                                                 @Param("status") StatusEnum.Status status,
                                                 Pageable pageable);
}
