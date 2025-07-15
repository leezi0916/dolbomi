package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.dto.ProposerDto.Create;
import com.kh.dolbomi.dto.ProposerDto.Response;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProposerService {
    ProposerDto.ResponseWithCount findProposersByHiringNo(Long hiringNo);

    Long createProposer(Create createProposerDto);


    boolean findProposerNo(Long hiringNo, Long caregiverNo);


    void cancel(Long hiringNo, Long caregiverNo);

    // 매칭 수락 (지원현황의 이력서 보고 수락!)
    void acceptMatching(Long resumeNo, Long hiringNo);

    // 매칭이 이미 수락된 이력서인지
    boolean isAccepted(Long resumeNo, Long hiringNo);

    // 나의 지원현황 목록
    Page<Response> getMyProposerLists(Long userNo, Pageable pageable);

    // 나의 지원현황 내역삭제
    Long deleteProposerHistory(Long proposerNo);

    //구인글의 작성자인지 권한체크
    Map<String, Object> getHiringOwnerInfo(Long hiringNo);
}
