package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.CareStatus;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

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
        String query = "SELECT DISTINCT h FROM Hiring h JOIN h.user u WHERE h.status = :status AND h.careStatus = :careStatus ORDER BY h.updateDate DESC";
        return em.createQuery(query, Hiring.class)
                .setParameter("status", status)
                .setParameter("careStatus", careStatus)
                .setMaxResults(4)
                .getResultList();
    }

    @Override
    public Page<Hiring> findByStatus(StatusEnum.Status status, Pageable pageable) {
        // 1. 페이징된 데이터 조회
        List<Hiring> content = em.createQuery(
                        "SELECT h FROM Hiring h WHERE h.status = :status AND h.hiringStatus = 'Y' ORDER BY h.hiringNo DESC",
                        Hiring.class)
                .setParameter("status", status)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // 2. 전체 개수 조회
        Long total = em.createQuery(
                        "SELECT COUNT(h) FROM Hiring h WHERE h.status = :status AND h.hiringStatus = 'Y'", Long.class)
                .setParameter("status", status)
                .getSingleResult();

        // 3. Page 객체로 변환
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
                  ORDER BY h.updateDate DESC 
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
