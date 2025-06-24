package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.dto.HiringDto;
import java.util.Optional;

public interface HiringService {
    Long createHiring(Long patNo, HiringDto.Create createDto);

    Optional<Hiring> findById(Long hiringNo);

    HiringDto.Response getHiringDetail(Long hiringNo);
}
