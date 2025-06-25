package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.FileDto;
import java.io.IOException;

public interface BoardService {
    Long createBoard(BoardDto.Create boardCreate, FileDto.Create fileCreate) throws IOException;
}
