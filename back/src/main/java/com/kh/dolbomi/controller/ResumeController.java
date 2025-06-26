package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.ResumeDto;
import com.kh.dolbomi.service.ResumeService;
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
@RequestMapping("/resume/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class ResumeController {

    private final ResumeService resumeService;

    // 메인 구직글 조회
    @GetMapping
    public ResponseEntity<List<ResumeDto.Response>> getMainResumeList() {
        // 페이징에 필요한 정보만 가져오기 위해 PageResponse 객체로 감싸기
        return ResponseEntity.ok(resumeService.getMainResumeList());
    }


    //이력서(구직글) 등록
    @PostMapping
    public ResponseEntity<Long> createResume(@RequestBody ResumeDto.Create createResumeDto) {
        Long resumeNo = resumeService.createResume(createResumeDto);
        return ResponseEntity.ok(resumeNo);
    }

    @GetMapping("/{userNo}")
    public ResponseEntity<List<ResumeDto.Response>> getResumeList(@PathVariable Long userNo) {
        return ResponseEntity.ok(resumeService.getResumList(userNo));
    }

    @PatchMapping("/{userNo}")
    public ResponseEntity<ResumeDto.Response> UpdatePaient(
            @PathVariable Long userNo,
            @RequestBody ResumeDto.Update updatePatDto) {
        return ResponseEntity.ok(resumeService.updateResume(userNo, updatePatDto));
    }

}

