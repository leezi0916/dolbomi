package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.Response;
import com.kh.dolbomi.dto.PageResponse;
import com.kh.dolbomi.dto.ReplyDto;
import com.kh.dolbomi.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/community/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class BoardController {
    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Long> createBoard(@RequestBody BoardDto.Create boardCreate) throws IOException {
        return ResponseEntity.ok(boardService.createBoard(boardCreate));
    }

    @PostMapping("/question/create")
    public ResponseEntity<Long> createQuestion(@RequestBody BoardDto.CreateQuestion questionCreate) throws IOException {
        return ResponseEntity.ok(boardService.createQuestion(questionCreate));
    }

    @PostMapping("/reply")
    public ResponseEntity<Long> createReply(@RequestBody ReplyDto.Create replyCreate) throws IOException {
        return ResponseEntity.ok(boardService.createReply(replyCreate));
    }

    @PostMapping("/reply/question")
    public ResponseEntity<Long> createReplyQuestion(@RequestBody ReplyDto.Create replyCreate
    ) throws IOException {
        return ResponseEntity.ok(boardService.createReplyQuestion(replyCreate));
    }


    @GetMapping("/caregiver")
    public ResponseEntity<PageResponse<Response>> getCaregiverList(Pageable pageable) {
        return ResponseEntity.ok(new PageResponse<>(boardService.getCaregiverList(pageable)));
    }

    @GetMapping("/guardian")
    public ResponseEntity<PageResponse<BoardDto.Response>> getGuardianList(Pageable pageable) {
        return ResponseEntity.ok(new PageResponse<>(boardService.getGuardianList(pageable)));
    }

    @GetMapping("/detail")
    public ResponseEntity<BoardDto.Response> getCommunityDetail(@RequestParam("board_no") Long boardNo,
                                                                HttpServletRequest request,
                                                                HttpServletResponse response) {
        return ResponseEntity.ok(boardService.getCommunityDetail(boardNo, request, response));
    }

    @GetMapping("/question")
    public ResponseEntity<PageResponse<BoardDto.Response>> getQuestionList(
            @RequestParam(value = "user_no", required = false) Long userNo, Pageable pageable) {
        if (userNo != null) {
            return ResponseEntity.ok(new PageResponse<>(boardService.getQuestionHistory(userNo, pageable)));
        }
        return ResponseEntity.ok(new PageResponse<>(boardService.getQuestionList(pageable)));
    }


}
