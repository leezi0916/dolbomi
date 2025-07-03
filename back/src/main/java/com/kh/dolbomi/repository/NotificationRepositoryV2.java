package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepositoryV2 extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipient_UserNoOrderByNotificationCreateDateDesc(Long userNo);

    //1달된 알림은 자동 삭제
//    void deleteByNotificationCreateDateBefore(LocalDateTime dateTime);
}
