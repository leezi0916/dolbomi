package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.dto.MatchingDto.ResponsePat;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import com.kh.dolbomi.repository.MatchingRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MatcingServicelmpl implements MatchingService {

    private final MatchingRepository matchingRepository;

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
                        (StatusEnum.Status) row[6]
                ))
                .collect(Collectors.toList());


    }

    @Override
    public List<ResponsePat> getMatchingListCaregiver(Long caregiverNo, Status matchingStatus) {
        List<Object[]> resultList = matchingRepository.findbyCaregiverNo(caregiverNo, matchingStatus);
        return resultList.stream()
                .map(row -> new MatchingDto.ResponsePat(
                        (Long) row[0],
                        (String) row[1],
                        (Integer) row[2],
                        (StatusEnum.Gender) row[3],
                        (LocalDateTime) row[4],
                        (StatusEnum.Status) row[5]
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Long changeStatus(Long matNo, Status matchingStatus) {
        Matching matching = matchingRepository.findByMetNo(matNo)
                .orElseThrow(() -> new IllegalArgumentException("매칭이 존재하지 않습니다."));
        matching.updateStatus(matchingStatus);
        return matchingRepository.save(matching).getMatNo();
    }
}
