package com.kh.dolbomi.repository;

import com.kh.dolbomi.entity.Patient;

import java.util.List;

public interface PatientRepository {
    void save(Patient patient);
    List<Patient> findByAll(Long userNo);

}