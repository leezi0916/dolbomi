package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ProposerDto;

public interface ProposerService {
    ProposerDto.ResponseWithCount findProposersByHiringNo(Long hiringNo);
}
