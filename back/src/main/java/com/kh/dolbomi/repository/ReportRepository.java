package com.kh.dolbomi.repository;

import java.util.List;

public interface ReportRepository {
    List<Object[]> getList(Long patNo);
}
