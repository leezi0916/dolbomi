package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Patient;
import com.kh.dolbomi.domain.Report;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByPatient(Patient patient);
}
