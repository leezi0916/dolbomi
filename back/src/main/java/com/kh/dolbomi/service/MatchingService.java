package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MatchingService {
    List<MatchingDto.Response> getMatchingList(Long patNo, Status matchingStatus);


    // 종료된 매칭 목록 페이징 조회 - 보호자 version
    Page<MatchingDto.Response> getMatchedListByStatus(Long patNo, Status status, Pageable pageable);

    List<MatchingDto.ResponsePat> getMatchingListCaregiver(Long caregiverNo, Status matchingStatus);
    
    Long changeStatus(Long matNo, Status matchingStatus);

    // 종료된 매칭 목록 페이징 조회 - 간병인 version
    Page<MatchingDto.ResponsePat> getMatchedPatientsByCaregiver(Long caregiverNo, Status status, Pageable pageable);

}
