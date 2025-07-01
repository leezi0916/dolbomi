package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {

    //    List<BoardDto> getBoardList(String status, String role);

    Page<BoardDto.Response> getGuardianList(Pageable pageable);

    Page<Response> getCaregiverList(Pageable pageable);

    Page<BoardDto.Response> getQuestionList(Pageable pageable);

    Page<BoardDto.Response> getQuestionHistory(Long userNo, Pageable pageable);

    BoardDto.Response getCommunityDetail(Long boardNo);
}
