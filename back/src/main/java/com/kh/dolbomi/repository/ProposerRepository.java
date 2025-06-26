package com.kh.dolbomi.repository;

import com.kh.dolbomi.enums.StatusEnum;

public interface ProposerRepository {
    boolean existsByHiringNoAndCaregiverNoAndStatus(Long hiringNo, Long caregiverNo, StatusEnum.Status status);

}
