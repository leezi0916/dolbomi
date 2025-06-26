package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.FileDto;
import com.kh.dolbomi.dto.PageResponse;
import com.kh.dolbomi.service.BoardService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/community/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class BoardController {
    private final BoardService boardService;

    //    @GetMapping
//    public List<BoardDto> getCommunityList(@RequestParam String status, @RequestParam String role) {
//        return boardService.getBoardList(status, role);
//    }
    @GetMapping
    public ResponseEntity<PageResponse<BoardDto.Response>> getBoardList(@RequestParam String role,
                                                                        Pageable pageable) {
//        @PageableDefault(size = 10, sort = "createDate", direction = Sort.Direction.DESC)
        if (role == "C") {
            return ResponseEntity.ok(new PageResponse<>(boardService.getCaregiverList(pageable)));
        } else if (role == "G") {
            return ResponseEntity.ok(new PageResponse<>(boardService.getGuardianList(pageable)));
        } else {
            return ResponseEntity.ok(new PageResponse<>(boardService.getQuestionList(pageable)));
        }
    }


    @PostMapping
    public ResponseEntity<Long> createBoard(@ModelAttribute BoardDto.Create boardCreate,
                                            @ModelAttribute FileDto.Create fileCreate) throws IOException {
        return ResponseEntity.ok(boardService.createBoard(boardCreate, fileCreate));
    }
}
