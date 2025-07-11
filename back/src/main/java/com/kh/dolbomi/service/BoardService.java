package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.Response;
import com.kh.dolbomi.dto.ReplyDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Long createBoard(BoardDto.Create boardDto) throws IOException;

    Page<BoardDto.Response> getGuardianList(String option, String keyword, Pageable pageable);

    Page<Response> getCaregiverList(String option, String keyword, Pageable pageable);

    Page<BoardDto.Response> getQuestionList(String option, String keyword, Pageable pageable);

    Page<BoardDto.Response> getQuestionHistory(String option, String keyword, Long userNo, Pageable pageable);

    BoardDto.Response getCommunityDetail(Long boardNo, HttpServletRequest request,
                                         HttpServletResponse response);

    Long createReply(ReplyDto.Create replyCreate);

    Long createQuestion(BoardDto.CreateQuestion questionCreate);

    Long createReplyQuestion(ReplyDto.Create replyCreate);

    Long updateBoard(BoardDto.Update boardUpdate);

    Long updateReply(ReplyDto.Update replyUpdate);


    String deleteBoard(Long boardNo);

    String deleteReply(Long replyNo);
}
