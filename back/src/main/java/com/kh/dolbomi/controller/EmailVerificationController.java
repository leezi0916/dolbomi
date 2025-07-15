package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.mail.EmailVerificationRequestDto;
import com.kh.dolbomi.service.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/email")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class EmailVerificationController {
    private final EmailVerificationService service;

    @PostMapping("/send-code")
    public ResponseEntity<?> sendCode(@RequestBody EmailVerificationRequestDto.Send request) {
        service.sendCode(request.getEmail());
        return ResponseEntity.ok("인증코드가 발송되었습니다.");
    }

    @PostMapping("/send-reset-link")
    public ResponseEntity<?> sendResetLink(@RequestBody EmailVerificationRequestDto.Send request) {
        service.sendResetLink(request.getEmail());
        return ResponseEntity.ok("인증링크가 발송되었습니다.");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody EmailVerificationRequestDto.Verify request) {
        boolean result = service.verifyCode(request.getEmail(), request.getCode());
        if (result) {
            return ResponseEntity.ok("인증이 완료되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("인증코드가 만료되었거나 이미 인증된 인증 코드입니다.");
        }
    }
}