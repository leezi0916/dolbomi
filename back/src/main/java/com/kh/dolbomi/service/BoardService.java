package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.FileDto;
import java.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Long createBoard(BoardDto.Create boardCreate, FileDto.Create fileCreate) throws IOException;

    //    List<BoardDto> getBoardList(String status, String role);

    Page<BoardDto.Response> getGuardianList(Pageable pageable);

    Page<BoardDto.Response> getCaregiverList(Pageable pageable);

    Page<BoardDto.Response> getQuestionList(Pageable pageable);
}
