package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.FileDto;
import com.kh.dolbomi.service.BoardService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class BoardController {
    private final BoardService boardService;

    @GetMapping
    public List<BoardDto> getCommunityList(@RequestParam String status, @RequestParam String role) {
        return boardService.getBoardList(status, role);
    }

    @PostMapping
    public ResponseEntity<Long> createBoard(@ModelAttribute BoardDto.Create boardCreate,
                                            @ModelAttribute FileDto.Create fileCreate) throws IOException {
        return ResponseEntity.ok(boardService.createBoard(boardCreate, fileCreate));
    }
}
