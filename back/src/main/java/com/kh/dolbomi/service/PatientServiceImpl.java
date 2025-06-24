package com.kh.dolbomi.service;


import com.kh.dolbomi.dto.PatientDto;
import com.kh.dolbomi.dto.UserDto;
import com.kh.dolbomi.entity.Patient;
import com.kh.dolbomi.entity.User;
import com.kh.dolbomi.repository.PatientRepository;
import com.kh.dolbomi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PatientServiceImpl implements PatientService{

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    @Override
    public Long createPatient(PatientDto.Create createDto) {

        User user = userRepository.findUserNo(createDto.getGuardian_no());
        
        Patient patient = createDto.toEntity(user);

        patientRepository.save(patient);
        return patient.getPatNo();
    }

    @Override
    public List<PatientDto.Response> getListPatient(Long userNo) {
        return patientRepository.findByAll(userNo).stream()
                .map(PatientDto.Response::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PatientDto.Response getPatient(Long patNo) {
        Patient patient = patientRepository.findOne(patNo).
                orElseThrow(()-> new EntityNotFoundException("조회된 회원이 없습니다."));
        return PatientDto.Response.toDetailDto(patient);
    }


}
