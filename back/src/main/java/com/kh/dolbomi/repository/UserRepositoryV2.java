package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.enums.SocialType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositoryV2 extends JpaRepository<User, Long> {
    User findByUserNo(Long userNo);

    Optional<User> findByUserId(String userId);

    // 소셜 로그인 -> 우리 DB에서 값 가져오기
    Optional<User> findBySocialIdAndSocialType(String socialId, SocialType socialType);
    
}
