package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Hiring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HiringRepositoryV2 extends JpaRepository<Hiring, Long> {

    //보호자 count (구인글 갯수로 판단 중복제거)
    @Query("SELECT COUNT(DISTINCT h.user.userNo) FROM Hiring h")
    int countDistinctByUserNo();
}
