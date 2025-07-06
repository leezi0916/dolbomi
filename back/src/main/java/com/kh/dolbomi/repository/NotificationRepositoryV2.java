package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Notification;
import com.kh.dolbomi.enums.StatusEnum;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepositoryV2 extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipient_UserNoOrderByNotificationCreateDateDesc(Long userNo);

    //읽음 여부 체크
    int countByRecipient_UserNoAndIsRead(Long userNo, StatusEnum.IS_READ isRead);

    //읽음으로 상태 변경
    List<Notification> findByRecipientUserNoAndIsRead(Long userNo, StatusEnum.IS_READ isRead);

    //1달된 알림은 자동 삭제
//    void deleteByNotificationCreateDateBefore(LocalDateTime dateTime);
}
