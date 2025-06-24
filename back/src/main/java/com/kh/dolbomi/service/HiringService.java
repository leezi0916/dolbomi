package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.HiringDto;
import com.kh.dolbomi.entity.Hiring;

import java.util.List;
import java.util.Optional;

public interface HiringService {
    Long createHiring(Long patNo, HiringDto.Create createDto);
    Optional<Hiring> findById(Long hiringNo);
    HiringDto.Response getHiringDetail(Long hiringNo);
}
