package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.dto.SearchDataDto;
import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class ResumeRepositoryImpl implements ResumeRepository {

    @PersistenceContext
    private EntityManager em;

    // 메인 카드용 구직글 8개 조회 (페이징 없이)
    @Override
    public List<Resume> getMainResumeList(StatusEnum.Status status) {
        String query = "SELECT DISTINCT r FROM Resume r JOIN r.user u LEFT JOIN License l ON l.user = u WHERE r.status = :status ORDER BY r.updateDate DESC";
        return em.createQuery(query, Resume.class)
                .setParameter("status", status)
                .setMaxResults(8)
                .getResultList();
    }

    @Override
    public Page<Resume> findByStatus(StatusEnum.Status status, Pageable pageable,
                                     SearchDataDto.ResumeSearch searchData) {

        // JPQL과 파라미터를 동적으로 구성
        StringBuilder jpqlBuilder = new StringBuilder(
                "SELECT r FROM Resume r JOIN r.user u WHERE r.status = :status");
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("status", status);

        // 1. DTO의 검색 조건에 따라 동적으로 WHERE 절 추가
        if (searchData != null) {
            // 지역
            if (StringUtils.hasText(searchData.getRegion())) {
                jpqlBuilder.append(" AND u.address LIKE :region");
                parameters.put("region", "%" + searchData.getRegion() + "%");
            }
            // 급여 (최소 급여 검색)
            if (searchData.getAccount() != null) {
                jpqlBuilder.append(" AND r.account <= :account");
                parameters.put("account", searchData.getAccount());
            }
            // 환자 성별
            if (StringUtils.hasText(searchData.getCare_gender())) {
                jpqlBuilder.append(" AND u.gender = :careGender");
                parameters.put("careGender", StatusEnum.Gender.valueOf(searchData.getCare_gender()));
            }
            // 상주 여부 (home -> careStatus)
            if (StringUtils.hasText(searchData.getHome())) {
                jpqlBuilder.append(" AND r.careStatus = :careStatus");
                parameters.put("careStatus", StatusEnum.CareStatus.valueOf(searchData.getHome())); // "Y" 또는 "N"
            }
            // 키워드 (제목 or 내용)
            if (StringUtils.hasText(searchData.getKeyword())) {
                jpqlBuilder.append(" AND (r.resumeTitle LIKE :keyword OR r.resumeContent LIKE :keyword)");
                parameters.put("keyword", "%" + searchData.getKeyword() + "%");
            }
        }

        // 정렬 조건 추가
        jpqlBuilder.append(" ORDER BY r.resumeNo DESC");

        // 2. 데이터 조회 쿼리 생성 및 실행
        TypedQuery<Resume> query = em.createQuery(jpqlBuilder.toString(), Resume.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Resume> content = query.getResultList();

        // 3. 전체 개수 조회 쿼리 생성 및 실행
        // COUNT 쿼리는 정렬이 필요 없으므로 재사용
        StringBuilder countJpqlBuilder = new StringBuilder(
                "SELECT COUNT(r) FROM Resume r JOIN r.user u WHERE r.status = :status ");
        // WHERE 절은 위에서 만든 것을 그대로 가져와 붙임
        if (jpqlBuilder.toString().contains("AND")) {
            countJpqlBuilder.append(jpqlBuilder.substring(jpqlBuilder.indexOf("AND")));
        }

        TypedQuery<Long> countQuery = em.createQuery(
                countJpqlBuilder.toString().replace(" ORDER BY r.resumeNo DESC", ""), Long.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            countQuery.setParameter(entry.getKey(), entry.getValue());
        }
        Long total = countQuery.getSingleResult();

        // 4. Page 객체로 변환하여 반환
        return new PageImpl<>(content, pageable, total);

    }

    public void save(Resume resume) {
        em.persist(resume);
    }

    @Override
    public Page<Resume> getResumeList(Long userNo, Pageable pageable) {

        String query = "SELECT r FROM Resume r  WHERE r.user.userNo = :userNo and r.status <> 'N'";

        List<Resume> result = em.createQuery(query, Resume.class)
                .setParameter("userNo", userNo)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        Long total = em.createQuery(
                        "SELECT COUNT(r) FROM Resume r WHERE r.user.userNo = :userNo and r.status <> 'N'", Long.class)
                .setParameter("userNo", userNo)
                .getSingleResult();

        return new PageImpl<>(result, pageable, total);
    }
}
