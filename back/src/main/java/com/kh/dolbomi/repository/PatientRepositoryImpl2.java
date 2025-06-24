package com.kh.dolbomi.repository;

import com.kh.dolbomi.dto.PatientDto;
import com.kh.dolbomi.entity.Patient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface PatientRepositoryImpl2 extends JpaRepository<Patient, Long> {



}
