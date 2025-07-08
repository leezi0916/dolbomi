package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.mail.MailRequestDto;
import com.kh.dolbomi.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @PostMapping(value = "/send", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> sendMail(
            @RequestPart("mail") MailRequestDto request,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            mailService.sendMail(request, file);
            return ResponseEntity.ok("메일전송 성공!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("메일 전송 실패: " + e.getMessage());
        }
    }
}