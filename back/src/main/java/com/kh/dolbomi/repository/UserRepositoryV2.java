package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositoryV2 extends JpaRepository<User, Long> {
    User findByUserNo(Long userNo);

    Optional<User> findByUserId(String userId);
}
