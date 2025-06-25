package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Patient;
import com.kh.dolbomi.domain.Report;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ReportDto;
import com.kh.dolbomi.repository.PatientRepositoryV2;
import com.kh.dolbomi.repository.ReportRepository;
import com.kh.dolbomi.repository.UserRepositoryV2;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final PatientRepositoryV2 patientRepositoryV2;
    private final ReportRepository reportRepository;
    private final UserRepositoryV2 userRepositoryV2;

    @Override
    public Long createReport(ReportDto.Create createReportDto) {
        Patient patient = patientRepositoryV2.findByPatNo(createReportDto.getPat_no());
        User user = userRepositoryV2.findByUserNo(createReportDto.getCare_giver_no());

        Report report = createReportDto.toEntity();
        report.changePatient(patient);
        report.changeUser(user);

        return reportRepository.save(report).getReportNo();
    }

    @Override
    public List<ReportDto.Response> findAll(Long patNo) {
        Patient patient = patientRepositoryV2.findByPatNo(patNo);

        return reportRepository.findAllByPatient(patient).stream()
                .map(
//                        ReportDto.Response::toDto
                        report -> {
                            User user = userRepositoryV2.findById(report.getUser().getUserNo())
                                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
                            report.changeUser(user); // Report와 User 연결
                            return ReportDto.Response.toDto(report, user.getUserName());
                        }
                ).toList();
    }
}
