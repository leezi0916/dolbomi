package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.ChatParticipant;
import com.kh.dolbomi.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    List<ChatParticipant> findByUser(User user);
}
