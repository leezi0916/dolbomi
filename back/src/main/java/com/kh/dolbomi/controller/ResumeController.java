package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.PageResponse;
import com.kh.dolbomi.dto.ResumeDto;
import com.kh.dolbomi.service.ResumeService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    // 메인(보호자 메인) 구직글 조회
    @GetMapping("/simple-list")
    public ResponseEntity<List<ResumeDto.Response>> getMainResumeList() {
        return ResponseEntity.ok(resumeService.getMainResumeList());
    }


    //간병사 모집 리스트 불러오기
    @GetMapping("/list")
    public ResponseEntity<PageResponse<ResumeDto.Response>> getPagedResumeList(Pageable pageable) {
        Page<ResumeDto.Response> resumePage = resumeService.getResumePage(pageable);
        PageResponse<ResumeDto.Response> response = new PageResponse<>(resumePage);

        return ResponseEntity.ok(response);
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


>>>>>>> 218319b16bd24b3f0fe19b5777db3accc82eb94d
}

