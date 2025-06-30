package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.dto.ProposerDto.Create;

public interface ProposerService {
    ProposerDto.ResponseWithCount findProposersByHiringNo(Long hiringNo);

    Long createProposer(Create createProposerDto);


    boolean findProposerNo(Long hiringNo, Long caregiverNo);


    void cancel(Long hiringNo, Long caregiverNo);

    // 매칭 수락 (지원현황의 이력서 보고 수락!)
    void acceptMatching(Long resumeNo, Long hiringNo);

}
