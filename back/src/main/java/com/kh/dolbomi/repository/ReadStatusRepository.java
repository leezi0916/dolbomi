package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.ChatRoom;
import com.kh.dolbomi.domain.ReadStatus;
import com.kh.dolbomi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReadStatusRepository extends JpaRepository<ReadStatus, Long> {

    Long countByChatRoomAndUserAndIsReadFalse(ChatRoom chatRoom, User user);
}
