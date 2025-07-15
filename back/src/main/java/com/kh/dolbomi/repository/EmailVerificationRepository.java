package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.EmailVerification;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {
    // 이메일 검증이지만 아이디 = 이메일 이기때문에 메서드명 ByuserId 및 파라미터 userId
    Optional<EmailVerification> findTopByEmailOrderByCreatedAtDesc(String userId);
}