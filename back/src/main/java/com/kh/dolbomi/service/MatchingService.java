package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.List;

public interface MatchingService {
    List<MatchingDto.Response> getMatchingList(Long patNo, Status matchingStatus);

    List<MatchingDto.ResponsePat> getMatchingListCaregiver(Long caregiverNo, Status matchingStatus);
}
