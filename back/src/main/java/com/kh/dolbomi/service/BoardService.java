package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.Response;
import java.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Long createBoard(BoardDto.Create boardDto) throws IOException;

    Page<BoardDto.Response> getGuardianList(Pageable pageable);

    Page<Response> getCaregiverList(Pageable pageable);

    Page<BoardDto.Response> getQuestionList(Pageable pageable);

    Page<BoardDto.Response> getQuestionHistory(Long userNo, Pageable pageable);

    BoardDto.Response getCommunityDetail(Long boardNo);
}
