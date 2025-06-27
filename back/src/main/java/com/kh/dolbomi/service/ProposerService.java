package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.dto.ProposerDto.Create;

public interface ProposerService {
    ProposerDto.ResponseWithCount findProposersByHiringNo(Long hiringNo);


    Long createProposer(Create createProposerDto);

    boolean findProposerNo(Long hiringNo, Long caregiverNo);


    void cancel(Long hiringNo, Long caregiverNo);
}
