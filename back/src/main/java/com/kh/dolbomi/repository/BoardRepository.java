package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.enums.StatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepository {
    Page<Board> findByStatus(StatusEnum.Status status, StatusEnum.Role role, Pageable pageable);
}
