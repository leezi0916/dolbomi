package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Matching;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingRepositoryV2 extends JpaRepository<Matching, Long> {
    // 특별한 쿼리는 필요 없지만 필요하면 여기에 추가
    // 지우지 마세요!!!!
}
