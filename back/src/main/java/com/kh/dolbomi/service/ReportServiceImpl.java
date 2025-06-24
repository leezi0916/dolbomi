package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Report;
import com.kh.dolbomi.dto.ReportDto;
import com.kh.dolbomi.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final ReportRepository reportRepository;

    @Override
    public Long createReport(ReportDto.Create createReportDto) {
        Report report = createReportDto.toEntity();

        reportRepository.save(report);
        return 0L;
    }
}
