package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.mail.MailRequestDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    @Value("${spring.mail.username}")
    private String senderEmail;

    public void sendMail(MailRequestDto request, MultipartFile file) throws MessagingException {
        // 1. 템플릿에 사용할 데이터 구성
        Context context = new Context(); // context : Thymleaf에 값 전달 해주는 객체
        context.setVariable("title", request.getTitle());
        context.setVariable("body", request.getBody());

        boolean isFile = file != null && !file.isEmpty();

        // 2. 템플릿 렌더링
        // email-template.html 파일을 렌더링해서 HTML 문자열로 만들어준다.
        String htmlContent = templateEngine.process("email-template", context);

        // 3. 메일 생성 및 전송
        MimeMessage message = mailSender.createMimeMessage(); // 메일 생성
        MimeMessageHelper helper = new MimeMessageHelper(message, isFile, "UTF-8"); // 첨부파일 여부 넘겨줌

        helper.setTo(request.getTo()); // 받는사람
        helper.setSubject(request.getSubject()); // 메일 제목
        helper.setText(htmlContent, true); // true -> HTML 형식
        try {
            helper.setFrom(new InternetAddress(senderEmail, "돌보미", "UTF-8")); // 보내는 사람 이메일 주소
        } catch (UnsupportedEncodingException e) {
            throw new MessagingException("보내는 사람 이름 인코딩 오류", e);
        }

        if (isFile) { // 파일이 있을경우
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린
            helper.addAttachment(originalFilename, file); // 메일에 추가
        }

        // 메일 전송
        mailSender.send(message);
    }
}