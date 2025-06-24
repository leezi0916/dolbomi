package com.kh.dolbomi.repository;

import com.kh.dolbomi.entity.Hiring;

import java.util.List;

public interface HiringRepository {
    void save(Hiring hiring);
    List<Hiring> findByUserNo(Long userNo); // 특정 보호자가 쓴 구인글 리스트

}
