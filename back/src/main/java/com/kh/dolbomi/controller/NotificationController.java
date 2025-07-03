package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.NotificationDto;
import com.kh.dolbomi.service.NotificationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notifications/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    //알림 리스트 갖고오기
    @GetMapping("/list")
    public List<NotificationDto.Response> getNotifications(@RequestParam("user_no") Long userNo) {
        return notificationService.getNotificationsByUserNo(userNo);
    }

    //알림 안읽은 개수 판단
    @GetMapping("/unread-count")
    public ResponseEntity<Integer> getUnreadCount(@RequestParam("user_no") Long userNo) {
        return ResponseEntity.ok(notificationService.getUnreadCount(userNo));
    }

    //알림 창 열었을 시 읽음표시로 변경
    @PatchMapping("/mark-read")
    public ResponseEntity<Void> markNotificationsAsRead(@RequestParam("user_no") Long userNo) {
        notificationService.markAllNotificationsAsRead(userNo);
        return ResponseEntity.ok().build();
    }

}
