package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.service.ProposerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/proposer/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProposerController {

    private final ProposerService proposerService;

    // 구인상세보기에서 지원현황 부분
    @GetMapping
    public ResponseEntity<ProposerDto.ResponseWithCount> getProposersByHiringNo(
            @RequestParam("hiring_no") Long hiringNo) {
        ProposerDto.ResponseWithCount response = proposerService.findProposersByHiringNo(hiringNo);
        return ResponseEntity.ok(response);
    }
}
