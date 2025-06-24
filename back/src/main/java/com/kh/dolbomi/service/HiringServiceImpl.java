package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.HiringDto;
import com.kh.dolbomi.entity.Hiring;
import com.kh.dolbomi.entity.Patient;
import com.kh.dolbomi.entity.User;
import com.kh.dolbomi.repository.HiringRepository;
import com.kh.dolbomi.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class HiringServiceImpl implements HiringService {

    private final HiringRepository hiringRepository;
    private final PatientRepository patientRepository;

    @Override
    public Long createHiring(Long patNo, HiringDto.Create createDto) {
        Patient patient = patientRepository.findOne(patNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 환자 번호입니다."));

        // 보호자 추출
        User user = patient.getGuardian(); // 또는 getUser() 등 필드에 따라 다름
        if (user == null) {
            throw new IllegalStateException("해당 환자에 보호자가 연결되어 있지 않습니다.");
        }

        createDto.setUser(user); // DTO에 보호자 set

        Hiring hiring = createDto.toEntity(patient);

        hiringRepository.save(hiring);

        return hiring.getHiringNo();
    }

    @Override
    public Optional<Hiring> findById(Long hiringNo) {
        return hiringRepository.findById(hiringNo);
    }

    @Override
    @Transactional(readOnly = true)
    public HiringDto.Response getHiringDetail(Long hiringNo) {
        Hiring hiring = hiringRepository.findById(hiringNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인글 번호입니다: " + hiringNo));

        return HiringDto.toDto(hiring);
    }
}
