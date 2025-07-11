package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MatchingRepositoryV2 extends JpaRepository<Matching, Long> {
    // 특별한 쿼리는 필요 없지만 필요하면 여기에 추가
    // 지우지 마세요!!!!


    // 매칭진행중 : 특정환자에 대한 간병인 목록가져오기
    List<Matching> findByPatient_PatNoAndStatusOrderByMatNoDesc(Long patNo, Status status);

    // 매칭진행중 : 특정간병인 대한 환자 목록가져오기
    List<Matching> findByCaregiver_UserNoAndStatusOrderByMatNoDesc(Long caregiverNo, Status status);


    Page<Matching> findByPatient_PatNoAndStatusOrderByEndDateDesc(Long patNo, StatusEnum.Status status,
                                                                  Pageable pageable);

    Page<Matching> findByCaregiver_UserNoAndStatusOrderByEndDateDesc(Long caregiverNo, Status status,
                                                                     Pageable pageable);

    //매칭 테이블에 접근해서 특정 간병인의 리뷰정보를 조회
    @Query("SELECT m.review FROM Matching m WHERE m.caregiver.userNo = :caregiverNo AND m.review IS NOT NULL AND m.review.status = :status ORDER BY m.review.updateDate DESC")
    Page<Review> findReviewsByCaregiverAndStatus(@Param("caregiverNo") Long caregiverNo,
                                                 @Param("status") StatusEnum.Status status,
                                                 Pageable pageable);


    // 특정 구인글에 대해 매칭중인지
    boolean existsByHiring_HiringNoAndCaregiver_UserNoAndStatus(Long hiringNo, Long caregiverNo,
                                                                StatusEnum.Status status);
}
