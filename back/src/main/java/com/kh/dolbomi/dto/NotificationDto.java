package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.Notification;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class NotificationDto {


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {

        private Long notificationNo;
        private String notificationMessage;
        private String notificationLinkUrl;
        private LocalDateTime notificationCreateDate;
        private String senderProfileImage;

        public static Response fromEntity(Notification notification) {
            return Response.builder()
                    .notificationNo(notification.getNotificationNo())
                    .notificationMessage(notification.getNotificationMessage())
                    .notificationLinkUrl(notification.getNotificationLinkUrl())
                    .notificationCreateDate(notification.getNotificationCreateDate()) // 또는 getNotificationCreateDate()
                    .senderProfileImage(notification.getSender().getProfileImage()) // null이면 프론트에서 기본이미지 처리
                    .build();
        }
    }
}