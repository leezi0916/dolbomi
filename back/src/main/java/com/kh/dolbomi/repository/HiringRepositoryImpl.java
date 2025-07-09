package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.dto.SearchDataDto;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.CareStatus;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class HiringRepositoryImpl implements HiringRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(Hiring hiring) {
        em.persist(hiring);
    }

    @Override
    public Optional<Hiring> findById(Long hiringNo) {
        Hiring hiring = em.find(Hiring.class, hiringNo);
        return Optional.ofNullable(hiring);
    }

    // 메인페이지(간병사 페이지) 구인글 조회 (상태 Y)
    // 상태가 Y인 최근 8개 구인글 조회
    @Override
    public List<Hiring> getMainHiringList(Status status) {
        String query = "SELECT DISTINCT h FROM Hiring h JOIN h.user u WHERE h.status = :status AND h.hiringStatus = 'Y' ORDER BY h.updateDate DESC";
        return em.createQuery(query, Hiring.class)
                .setParameter("status", status)
                .setMaxResults(8)
                .getResultList();
    }

    // 상태 Y + care_status가 Y인 최근 4개 구인글 조회
    @Override
    public List<Hiring> getMainCareHiringList(Status status, CareStatus careStatus) {
        String query = "SELECT DISTINCT h FROM Hiring h JOIN h.user u WHERE h.status = :status AND h.careStatus = :careStatus  AND h.hiringStatus = 'Y' ORDER BY h.updateDate DESC";
        return em.createQuery(query, Hiring.class)
                .setParameter("status", status)
                .setParameter("careStatus", careStatus)
                .setMaxResults(4)
                .getResultList();
    }

    @Override
    public Page<Hiring> findByStatus(StatusEnum.Status status, Pageable pageable,
                                     SearchDataDto.HiringSearch searchData) {

        // JPQL과 파라미터를 동적으로 구성
        StringBuilder jpqlBuilder = new StringBuilder(
                "SELECT h FROM Hiring h JOIN h.patient p JOIN h.user u WHERE h.status = :status AND h.hiringStatus = 'Y'");
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("status", status);

        // 1. DTO의 검색 조건에 따라 동적으로 WHERE 절 추가
        if (searchData != null) {
            // 지역
            if (StringUtils.hasText(searchData.getRegion())) {
                jpqlBuilder.append(" AND p.patAddress LIKE :region");
                parameters.put("region", "%" + searchData.getRegion() + "%");
            }
            // 시작일
            if (searchData.getStart_date() != null) {
                jpqlBuilder.append(" AND h.startDate >= :startDate");
                parameters.put("startDate", searchData.getStart_date());
            }
            // 종료일
            if (searchData.getEnd_date() != null) {
                jpqlBuilder.append(" AND h.endDate <= :endDate");
                parameters.put("endDate", searchData.getEnd_date().plusDays(1)); // 해당 날짜 전체 포함
            }
            // 급여 (최소 급여 검색)
            if (searchData.getAccount() != null) {
                jpqlBuilder.append(" AND h.account >= :account");
                parameters.put("account", searchData.getAccount());
            }
            // 환자 성별
            if (StringUtils.hasText(searchData.getPat_gender())) {
                jpqlBuilder.append(" AND p.patGender = :patGender");
                parameters.put("patGender", StatusEnum.Gender.valueOf(searchData.getPat_gender()));
            }
            // 상주 여부 (home -> careStatus)
            if (StringUtils.hasText(searchData.getHome())) {
                jpqlBuilder.append(" AND h.careStatus = :careStatus");
                parameters.put("careStatus", StatusEnum.CareStatus.valueOf(searchData.getHome())); // "Y" 또는 "N"
            }
            // 키워드 (제목 or 내용)
            if (StringUtils.hasText(searchData.getKeyword())) {
                jpqlBuilder.append(" AND (h.hiringTitle LIKE :keyword OR h.hiringContent LIKE :keyword)");
                parameters.put("keyword", "%" + searchData.getKeyword() + "%");
            }
        }

        // 정렬 조건 추가
        jpqlBuilder.append(" ORDER BY h.hiringNo DESC");

        // 2. 데이터 조회 쿼리 생성 및 실행
        TypedQuery<Hiring> query = em.createQuery(jpqlBuilder.toString(), Hiring.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Hiring> content = query.getResultList();

        // 3. 전체 개수 조회 쿼리 생성 및 실행
        // COUNT 쿼리는 정렬이 필요 없으므로 재사용
        StringBuilder countJpqlBuilder = new StringBuilder(
                "SELECT COUNT(h) FROM Hiring h JOIN h.patient p JOIN h.user u WHERE h.status = :status AND h.hiringStatus = 'Y'");
        // WHERE 절은 위에서 만든 것을 그대로 가져와 붙임
        if (jpqlBuilder.toString().contains("AND")) {
            countJpqlBuilder.append(jpqlBuilder.substring(jpqlBuilder.indexOf("AND")));
        }

        TypedQuery<Long> countQuery = em.createQuery(
                countJpqlBuilder.toString().replace(" ORDER BY h.hiringNo DESC", ""), Long.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            countQuery.setParameter(entry.getKey(), entry.getValue());
        }
        Long total = countQuery.getSingleResult();

        // 4. Page 객체로 변환하여 반환
        return new PageImpl<>(content, pageable, total);

    }

    @Override
    public void softDeleteByHiringNo(Long hiringNo) {
        Hiring hiring = em.find(Hiring.class, hiringNo);
        if (hiring != null) {
            hiring.hiringDeleted(); // 상태를 'N'으로 변경
        }
    }

    // 내 구인글 조회
    @Override
    public Page<Hiring> getMyHiringLists(Status status, Pageable pageable, Long userNo) {
        String query = """
                  SELECT h
                  FROM Hiring h
                  WHERE h.status = :status AND h.user.userNo = :userNo
                  ORDER BY h.hiringStatus DESC, h.updateDate DESC 
                """;

        List<Hiring> hirings = em.createQuery(query, Hiring.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .setFirstResult((int) pageable.getOffset()) // 어디서부터 가지고 올것인가 - OFFSET
                .setMaxResults(pageable.getPageSize())  // 몇개를 가지고 올것인가 - LIMIT
                .getResultList();

        String countQuery = """
                    SELECT COUNT(DISTINCT h.hiringNo)
                    FROM Hiring h
                    WHERE h.status = :status AND h.user.userNo = :userNo
                """;

        Long totalCount = em.createQuery(countQuery, Long.class)
                .setParameter("status", status)
                .setParameter("userNo", userNo)
                .getSingleResult();

        // Page<T> 인터페이스의 기본구현체를 통해서 paging한 정보를 한번에 전달할 수 있음
        // new PageImpl<>(content,pageable,total);
        return new PageImpl<Hiring>(hirings, pageable, totalCount);
    }

}
