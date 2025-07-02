package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.NotificationDto;
import java.util.List;

public interface NotificationService {

    //알림 생성
    void createNotification(Long recipientNo, Long senderNo, String notificationMessage, String notificationLinkUrl);

    //알림 조회
    List<NotificationDto.Response> getNotificationsByUserNo(Long userNo);
}
