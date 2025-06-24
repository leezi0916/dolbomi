package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.License;
import com.kh.dolbomi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenseRepository extends JpaRepository<License, Long> {
    List<License> findByUser(User user);
}
