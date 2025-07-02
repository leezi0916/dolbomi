package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.dto.MatchingDto.ResponsePat;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import com.kh.dolbomi.repository.MatchingRepository;
import com.kh.dolbomi.repository.MatchingRepositoryV2;
import java.time.LocalDateTime;
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
    public List<MatchingDto.Response> getMatchingList(Long patNo, Status matchingStatus) {

        List<Object[]> resultList = matchingRepository.findbyPatNo(patNo, matchingStatus);
        return resultList.stream()
                .map(row -> new MatchingDto.Response(
                        (Long) row[0],
                        (Long) row[1],
                        (String) row[2],
                        (Integer) row[3],
                        (StatusEnum.Gender) row[4],
                        (LocalDateTime) row[5],
                        (StatusEnum.Status) row[6],
                        (Long) row[7]

                ))
                .collect(Collectors.toList());


    }

    @Override
    @Transactional(readOnly = true)
    public Page<MatchingDto.Response> getMatchedListByStatus(Long patNo, Status status, Pageable pageable) {
        return matchingRepositoryV2.findByPatientPatNoAndStatus(patNo, status, pageable)
                .map(matching -> MatchingDto.Response.builder()
                        .mat_no(matching.getMatNo())
                        .caregiver_no(matching.getCaregiver().getUserNo())
                        .user_name(matching.getCaregiver().getUserName())
                        .age(matching.getCaregiver().getAge())
                        .gender(matching.getCaregiver().getGender())
                        .start_date(matching.getStartDate())
                        .status(matching.getStatus())
                        .build());
    }


    public List<ResponsePat> getMatchingListCaregiver(Long caregiverNo, Status matchingStatus) {
        List<Object[]> resultList = matchingRepository.findbyCaregiverNo(caregiverNo, matchingStatus);
        return resultList.stream()
                .map(row -> new MatchingDto.ResponsePat(
                        (Long) row[0],
                        (String) row[1],
                        (Integer) row[2],
                        (StatusEnum.Gender) row[3],
                        (LocalDateTime) row[4],
                        (StatusEnum.Status) row[5],
                        (Long) row[6]
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Page<MatchingDto.ResponsePat> getMatchedPatientsByCaregiver(Long caregiverNo, Status status,
                                                                       Pageable pageable) {
        return matchingRepositoryV2.findByCaregiverUserNoAndStatus(caregiverNo, status, pageable)
                .map(MatchingDto.ResponsePat::from);
    }


}
