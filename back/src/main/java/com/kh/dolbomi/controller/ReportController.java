package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.ReportDto;
import com.kh.dolbomi.service.ReportService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/report/v1")
public class ReportController {

    public final ReportService reportService;

    //    진단일지 작성
    @PostMapping
    public ResponseEntity<Long> createReport(@RequestBody ReportDto.Create reportCreate) {
        System.out.println("작성한 일지" + reportCreate.getReport_title());
        return ResponseEntity.ok(reportService.createReport(reportCreate));
    }

    //    진단일지 목록/상세 불러오기
    @GetMapping("/{patNo}")
    public ResponseEntity<List<ReportDto.Response>> getReports(@PathVariable Long patNo) {
        List<ReportDto.Response> reports = reportService.getList(patNo);
        return ResponseEntity.ok(reports);
    }

    //진단일지 수정
    @PatchMapping
    public ResponseEntity<Void> updateReport(@RequestBody ReportDto.Update update) {
        reportService.updateReport(update);
        return ResponseEntity.ok().build();
    }

    // 진단일지 
    //  진단일지 삭제
    @PatchMapping("/detail/{reportNo}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long reportNo) {
        reportService.deleteReport(reportNo);
        return ResponseEntity.ok().build();
    }

}
