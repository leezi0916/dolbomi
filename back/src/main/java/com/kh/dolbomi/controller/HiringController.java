package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.HiringDto;
import com.kh.dolbomi.service.HiringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hireling")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class HiringController {

    private final HiringService hiringService;

    // 구인글 작성
    @PostMapping
    public ResponseEntity<Long> createHiring(@RequestBody HiringDto.Create createDto) {
        Long patNo = createDto.getPat_no();
        if (patNo == null) {
            return ResponseEntity.badRequest().build();
        }

        Long hiringNo = hiringService.createHiring(patNo, createDto);

        return ResponseEntity.ok(hiringNo);
    }

}
