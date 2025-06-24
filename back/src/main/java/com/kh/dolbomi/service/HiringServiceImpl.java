package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.HiringDto;
import com.kh.dolbomi.entity.Hiring;
import com.kh.dolbomi.entity.Patient;
import com.kh.dolbomi.repository.HiringRepository;
import com.kh.dolbomi.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HiringServiceImpl implements HiringService {

    private final HiringRepository hiringRepository;
    private final PatientRepository patientRepository;

    @Override
    public Long createHiring(Long patNo, HiringDto.Create createDto) {
//        // 1. 환자 조회 (존재하지 않으면 예외)
//        Patient patient = patientRepository.findById(patNo)
//                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 환자 번호입니다: " + patNo));
//
//        // 2. DTO -> Entity 변환 (Patient 객체 넘김)
//        Hiring hiring = createDto.toEntity(patient);
//
//        // 3. 저장
//        hiringRepository.save(hiring);
//
//        // 4. 저장된 구인글 번호 반환
//        return hiring.getHiringNo();

        return null;
    }
}
