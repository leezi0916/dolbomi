package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepositoryV2 extends JpaRepository<Board, Long> {
}
