package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.dto.MatchingDto.Response;
import com.kh.dolbomi.enums.StatusEnum.Status;
import com.kh.dolbomi.repository.MatchingRepository;
import com.kh.dolbomi.repository.MatchingRepositoryV2;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MatcingServicelmpl implements MatchingService {

    private final MatchingRepository matchingRepository;
    private final MatchingRepositoryV2 matchingRepositoryV2;


    @Override
    @Transactional(readOnly = true)
    public List<MatchingDto.Response> getMatchingCargiverList(Long patNo, Status status) {

        return matchingRepositoryV2.findByPatientPatNoAndStatus(patNo, status).stream()
                .map(MatchingDto.Response::toDto)
                .collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public Page<MatchingDto.Response> getMatchedListByStatus(Long patNo, Status status, Pageable pageable) {

        return matchingRepositoryV2.findByPatientPatNoAndStatus(patNo, status, pageable)
                .map(MatchingDto.Response::toDto);
    }


    public List<MatchingDto.ResponsePat> getMatchingListCaregiver(Long caregiverNo, Status status) {

        return matchingRepositoryV2.findByCaregiverUserNoAndStatus(caregiverNo, status).stream()
                .map(MatchingDto.ResponsePat::from)
                .collect(Collectors.toList());


    }

    @Override
    public Long changeStatus(Long matNo, Status matchingStatus) {
        Matching matching = matchingRepository.findByMetNo(matNo)
                .orElseThrow(() -> new IllegalArgumentException("매칭이 존재하지 않습니다."));
        matching.updateStatus(matchingStatus);
        return matchingRepository.save(matching).getMatNo();
    }

    @Override
    public Page<MatchingDto.ResponsePat> getMatchedPatientsByCaregiver(Long caregiverNo, Status status,
                                                                       Pageable pageable) {
        return matchingRepositoryV2.findByCaregiverUserNoAndStatus(caregiverNo, status, pageable)
                .map(MatchingDto.ResponsePat::from);

    }


    // 종료된 매칭에 회원탈퇴한 유저list
    @Override
    public Page<Response> getMatchedListByCheckStatus(Long patNo, Status status, Status userStatus, Pageable pageable) {

        System.out.println("test :" + patNo + ":" + status + ":" + userStatus + ":" + pageable.getPageSize());
        return matchingRepository.findByCheckList(patNo, status, userStatus, pageable)
                .map(MatchingDto.Response::toDto);
    }


}
