package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.HiringDto;

import java.util.List;

public interface HiringService {
    Long createHiring(Long patNo, HiringDto.Create createDto);
}
