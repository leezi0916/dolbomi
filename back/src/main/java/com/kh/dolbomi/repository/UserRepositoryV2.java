package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositoryV2 extends JpaRepository<User, Long> {
    User findByUserNo(Long userNo);
}
