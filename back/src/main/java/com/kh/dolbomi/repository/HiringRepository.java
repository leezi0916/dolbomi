package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Hiring;
import java.util.List;
import java.util.Optional;

public interface HiringRepository {
    void save(Hiring hiring);

    Hiring findByHiringNo(Long hiringNo); //구인글 번호로 구인 정보 갖고오기

    Optional<Hiring> findById(Long hiringNo);


    List<Hiring> findByUserNo(Long userNo); // 특정 보호자가 쓴 구인글 리스트 아직기능구현 안됌
}
