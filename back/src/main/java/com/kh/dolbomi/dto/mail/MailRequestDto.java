package com.kh.dolbomi.dto.mail;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailRequestDto {
    private String to; // 받는사람
    private String subject; // 메일 제목
    private String title; // 내용의 제목
    private String body; // 내용
}