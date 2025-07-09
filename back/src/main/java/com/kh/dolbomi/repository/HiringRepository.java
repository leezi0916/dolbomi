package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.dto.SearchDataDto;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.CareStatus;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HiringRepository {
    //구인글 등록
    void save(Hiring hiring);


    //구인글 상세보기
    Optional<Hiring> findById(Long hiringNo); // Optional로 감싼 단건 조회

    // 메인페이지(간병사 페이지) 일반 구인글 조회
    List<Hiring> getMainHiringList(Status status);

    // 메인페이지(간병사 페이지) 숙식제공 구인글 조회
    List<Hiring> getMainCareHiringList(Status status, CareStatus careStatus);

    // 돌봄대상자 모집 리스트(페이징)
    Page<Hiring> findByStatus(StatusEnum.Status status, Pageable pageable, SearchDataDto.HiringSearch searchData);

    // 구인글 삭제
    void softDeleteByHiringNo(Long hiringNo);

    // 내 구인글 조회
    Page<Hiring> getMyHiringLists(Status status, Pageable pageable, Long userNo);
}