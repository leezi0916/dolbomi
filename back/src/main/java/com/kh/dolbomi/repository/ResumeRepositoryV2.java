package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Resume;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepositoryV2 extends JpaRepository<Resume, Long> {

    Optional<Resume> findById(Long resumeNo);
}
