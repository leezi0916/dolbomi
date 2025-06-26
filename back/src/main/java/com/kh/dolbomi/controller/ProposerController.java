package com.kh.dolbomi.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/proposer/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProposerController {

//    private final ProposerService proposerService;
//
//    @GetMapping("/status")
//    public ResponseEntity<Map<String, Boolean>> checkProposerStatus(
//            @RequestParam Long hiringNo,
//            @RequestParam Long caregiverNo
//    ) {
//        boolean applied = proposerService.checkIfApplied(hiringNo, caregiverNo);
//        return ResponseEntity.ok(Collections.singletonMap("applied", applied));
//    }
}
