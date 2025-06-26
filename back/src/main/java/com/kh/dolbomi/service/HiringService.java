package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.HiringDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface HiringService {
    // 구인글 페이징 리스트 조회 (상태 Y)
    Page<HiringDto.Response> getHiringPage(Pageable pageable);

    // 구인글 등록
    Long createHiring(Long patNo, HiringDto.Create createDto);

    // 상세보기 메서드 (DetailResponse DTO 사용)
    HiringDto.DetailResponse getHiringDetail(Long hiringNo, Long caregiverNo);

    //구인글 삭제하기
//    void deleteHiring(Long hiringNo);
}
