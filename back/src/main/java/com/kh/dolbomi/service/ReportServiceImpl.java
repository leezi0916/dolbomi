package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Patient;
import com.kh.dolbomi.domain.Report;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ReportDto;
import com.kh.dolbomi.enums.StatusEnum.Status;
import com.kh.dolbomi.exception.PatientNotFoundException;
import com.kh.dolbomi.exception.ReportNotFoundException;
import com.kh.dolbomi.exception.UserNotFoundException;
import com.kh.dolbomi.repository.PatientRepositoryV2;
import com.kh.dolbomi.repository.ReportRepository;
import com.kh.dolbomi.repository.ReportRepositoryV2;
import com.kh.dolbomi.repository.UserRepositoryV2;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
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
        if (patient == null) {
            throw new PatientNotFoundException("해당 환자를 찾을 수 없습니다.");
        }

        User user = userRepositoryV2.findByUserNo(createReportDto.getCare_giver_no());
        if (user == null) {
            throw new UserNotFoundException("해당 간병인을 찾을 수 없습니다.");
        }

        Report report = createReportDto.toEntity();
        report.changePatient(patient);
        report.changeUser(user);

        return reportRepositoryV2.save(report).getReportNo();
    }

    @Override
    public List<ReportDto.Response> getList(Long patNo) {
        List<Object[]> reports = reportRepository.getList(patNo);
        return reports.stream()
                .map(row -> new ReportDto.Response(
                        (Long) row[0],
                        (String) row[1],
                        (String) row[2],
                        (LocalDateTime) row[3],
                        (String) row[4],
                        (Long) row[5]
                ))
                .collect(Collectors.toList());
    }

    @Override
    public void updateReport(ReportDto.Update update) {

        Report report = reportRepositoryV2.findById(update.getReport_no())
                .orElseThrow(() -> new ReportNotFoundException("해당 진단일지를 찾을 수 없습니다."));

        report.changReportTitle(update.getReport_title());
        report.changReportContent(update.getReport_content());
        report.changUpdateDate(update.getUpdate_date());

        reportRepositoryV2.save(report);
    }

    @Override
    public void deleteReport(Long reportNo) {
        Report report = reportRepositoryV2.findById(reportNo)
                .orElseThrow(() -> new ReportNotFoundException("해당 진단일지를 찾을 수 없습니다."));
        report.changeStatus(Status.N);
        reportRepositoryV2.save(report);
    }

}

