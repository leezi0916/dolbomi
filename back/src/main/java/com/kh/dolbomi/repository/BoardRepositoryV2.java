package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Board;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepositoryV2 extends JpaRepository<Board, Long> {
    Optional<Board> findByBoardNo(Long boardNo);
}
