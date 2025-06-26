package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepositoryV2 extends JpaRepository<Review, Long> {

    //간병인 번호로 간병인에게 달려있는 리뷰 조회 (매칭테이블과 조인해서 갖고와야함)
    @Query("""
                SELECT AVG(r.score)
                FROM Review r
                WHERE r IN (
                    SELECT m.review
                    FROM Matching m
                    WHERE m.caregiver.userNo = :caregiverNo
                    AND m.review IS NOT NULL
                )
            """)
    Double findAverageScoreByCaregiverNo(@Param("caregiverNo") Long caregiverNo);
}
