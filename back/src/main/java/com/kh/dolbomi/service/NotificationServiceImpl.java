package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Notification;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.NotificationDto;
import com.kh.dolbomi.repository.NotificationRepositoryV2;
import com.kh.dolbomi.repository.UserRepositoryV2;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepositoryV2 notificationRepositoryV2;
    private final UserRepositoryV2 userRepositoryV2;

    @Override
    public void createNotification(Long recipientNo, Long senderNo, String notificationMessage,
                                   String notificationLinkUrl) {
        // 수신자(알림 받는 사람)
        User recipient = userRepositoryV2.findById(recipientNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 수신자가 존재하지 않습니다."));

        // 발신자(알림 보낸 사람)
        User sender = userRepositoryV2.findById(senderNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 발신자가 존재하지 않습니다."));

        // 알림 객체 생성
        Notification notification = Notification.builder()
                .recipient(recipient)
                .sender(sender)
                .notificationMessage(notificationMessage)
                .notificationLinkUrl(notificationLinkUrl)
                .build();

        // 저장
        notificationRepositoryV2.save(notification);
    }

    // 알림창 값 불러오기
    @Transactional(readOnly = true)
    public List<NotificationDto.Response> getNotificationsByUserNo(Long userNo) {
        List<Notification> notifications = notificationRepositoryV2.findByRecipient_UserNoOrderByNotificationCreateDateDesc(
                userNo);

        return notifications.stream()
                .map(NotificationDto.Response::fromEntity)
                .toList();
    }

    //알림 온지 한달 된
//    @Transactional
//    public void deleteOldNotifications() {
//        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
//        notificationRepositoryV2.deleteByNotificationCreateDateBefore(oneMonthAgo);
//    }
}
