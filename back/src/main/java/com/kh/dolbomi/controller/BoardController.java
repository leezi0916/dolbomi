package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.PageResponse;
import com.kh.dolbomi.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/community/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class BoardController {
    private final BoardService boardService;

    //    @GetMapping
//    public List<BoardDto> getCommunityList(@RequestParam String status, @RequestParam String role) {
//        return boardService.getBoardList(status, role);
//    }

    @GetMapping("/caregiver")
    public ResponseEntity<PageResponse<BoardDto.Response>> getCaregiverList(Pageable pageable) {
        return ResponseEntity.ok(new PageResponse<>(boardService.getCaregiverList(pageable)));
    }

    @GetMapping("/guardian")
    public ResponseEntity<PageResponse<BoardDto.Response>> getGuardianList(Pageable pageable) {
        return ResponseEntity.ok(new PageResponse<>(boardService.getGuardianList(pageable)));
    }

    @GetMapping("/question")
    public ResponseEntity<PageResponse<BoardDto.Response>> getQuestionList(Pageable pageable) {
        return ResponseEntity.ok(new PageResponse<>(boardService.getQuestionList(pageable)));
    }
}
