package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Resume;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ResumeRepositoryV2 extends JpaRepository<Resume, Long> {
    Optional<Resume> findById(Long resumeNo);

    //간병사 count (이력서 갯수로 판단 중복제거)
    @Query("SELECT COUNT(DISTINCT r.user.userNo) FROM Resume r")
    int countDistinctByUserNo();

    List<Resume> findByUser_UserNo(Long userNo);
}
