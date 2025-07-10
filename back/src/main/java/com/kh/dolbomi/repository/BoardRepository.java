package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.enums.StatusEnum;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepository {
    Page<Board> findByStatus(StatusEnum.Status status, StatusEnum.Role role, String option, String keyword,
                             Pageable pageable);

    Page<Board> findByUserNo(StatusEnum.Status status, StatusEnum.Role role, Long userNo, Pageable pageable);

    Optional<Board> findByBoardNo(Long boardNo);
}
