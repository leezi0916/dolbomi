package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ReportDto;
import java.util.List;

public interface ReportService {
    Long createReport(ReportDto.Create createReportDto);

    List<ReportDto.Response> findAll(Long patNo);
}
