package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.enums.StatusEnum.Status;
import com.kh.dolbomi.repository.MatchingRepository;
import java.util.List;
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

//        List<MatchingDto.Response> list = matchingRepository.findbyPatNo(patNo, matchingStatus)
//                .stream().map(MatchingDto.Response::toDto)
//                .collect(Collectors.toList());

//        List<Object[]> resultList = matchingRepository.findbyPatNo(patNo, matchingStatus);
//        return resultList.stream()
//                .map(row -> new MatchingDto.Response(
//                        (Long) row[0],
//                        (String) row[1],
//                        (Integer) row[2],
//                        (LocalDateTime) row[3]
//                ))
//                .collect(Collectors.toList());

//        return matchingRepository.findbyPatNo(patNo, matchingStatus)
//                .stream().map(MatchingDto.Response::toDto)
//                .collect(Collectors.toList());
        return null;
    }
}
