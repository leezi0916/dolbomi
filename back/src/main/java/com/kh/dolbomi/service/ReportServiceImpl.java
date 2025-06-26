package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Patient;
import com.kh.dolbomi.domain.Report;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ReportDto;
import com.kh.dolbomi.repository.PatientRepositoryV2;
import com.kh.dolbomi.repository.ReportRepository;
import com.kh.dolbomi.repository.ReportRepositoryV2;
import com.kh.dolbomi.repository.UserRepositoryV2;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final PatientRepositoryV2 patientRepositoryV2;
    private final ReportRepositoryV2 reportRepositoryV2;
    private final ReportRepository reportRepository;
    private final UserRepositoryV2 userRepositoryV2;

    @Override
    public Long createReport(ReportDto.Create createReportDto) {
        Patient patient = patientRepositoryV2.findByPatNo(createReportDto.getPat_no());
        User user = userRepositoryV2.findByUserNo(createReportDto.getCare_giver_no());

        Report report = createReportDto.toEntity();
        report.changePatient(patient);
        report.changeUser(user);

        return reportRepositoryV2.save(report).getReportNo();
    }

    @Override
    public List<ReportDto.Response> findAll(Long patNo) {
        Patient patient = patientRepositoryV2.findByPatNo(patNo);
//        reportRepository.findAllByPatient(patient);
        return null;

    }
}
