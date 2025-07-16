package com.kh.dolbomi.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ReportRepositoryImpl implements ReportRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Object[]> getList(Long patNo) {
        String query =
                "SELECT r.reportNo, r.reportTitle, u.userName, r.createDate, r.reportContent, r.user.userNo "
                        + "FROM Report r JOIN r.user u JOIN r.patient p " +
                        "WHERE r.status = 'Y' AND p.patNo = :patNo " +
                        "ORDER BY r.createDate DESC";

        return em.createQuery(query, Object[].class)
                .setParameter("patNo", patNo)
                .getResultList();
    }
}
