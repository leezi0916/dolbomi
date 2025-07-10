package com.kh.dolbomi.repository;


import com.kh.dolbomi.domain.Reply;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepositoryV2 extends JpaRepository<Reply, Long> {
    Optional<Reply> findByReplyNo(Long replyNo);
}
