package com.kh.dolbomi.repository;

import com.kh.dolbomi.enums.StatusEnum;
import java.util.List;

public interface MatchingRepository {
    List<Object[]> findbyPatNo(Long patNo, StatusEnum.Status matchingStatus);
}
