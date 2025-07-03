package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.NotificationDto;
import com.kh.dolbomi.service.NotificationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notifications/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;


    @GetMapping("/list")
    public List<NotificationDto.Response> getNotifications(@RequestParam("user_no") Long userNo) {
        return notificationService.getNotificationsByUserNo(userNo);
    }
}
