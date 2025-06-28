package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.service.ProposerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public ResponseEntity<Long> getProposers(@RequestBody ProposerDto.Create createProposerDto) {

        Long proposerNo = proposerService.createProposer(createProposerDto);

        return ResponseEntity.ok(proposerNo);
    }

    //보호자가 내 구인글의 신청온 이력서 보고 수락하기
    @PostMapping("/accept")
    public ResponseEntity<String> acceptMatching(@RequestBody MatchingDto matchingDto) {
        proposerService.acceptMatching(matchingDto.getResume_no(), matchingDto.getHiring_no());
        return ResponseEntity.ok("매칭이 수락되었습니다.");
    }
}
