package com.kh.dolbomi.repository;

import com.kh.dolbomi.dto.PatientDto;
import com.kh.dolbomi.entity.Patient;
import com.kh.dolbomi.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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


    @Override
    public Optional<Patient> findOne(Long patNo) {
        return Optional.ofNullable(em.find(Patient.class, patNo));
    }


}
