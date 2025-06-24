package com.kh.dolbomi.repository;


import com.kh.dolbomi.entity.Patient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public class PatientRepositoryImpl implements PatientRepository {

        @PersistenceContext
        private EntityManager em;


    @Override
    public void save(Patient patient) { em.persist(patient);

    }

    @Override
    public List<Patient> findByAll(Long userNo) {
        return em.createQuery("SELECT p FROM Patient p WHERE p.guardian_no = :userNo JOIN ", Patient.class)
                .setParameter("userNo", userNo)
                .getResultList();

    }

}
