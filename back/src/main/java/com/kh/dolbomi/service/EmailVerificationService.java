package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.EmailVerification;
import com.kh.dolbomi.exception.UserNotFoundException;
import com.kh.dolbomi.repository.EmailVerificationRepository;
import com.kh.dolbomi.repository.UserRepositoryV2;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
@Transactional
public class EmailVerificationService {

    private final EmailVerificationRepository emailVerificationRepository;
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final UserRepositoryV2 userRepositoryV2;

    public void sendVerificationCode(String email) {
        String code = String.format("%06d", new Random().nextInt(999999));

        // 비밀번호 변경 페이지
        String resetLink = "http://localhost:5173/reset-password/code?code=" + code + "&email=" + email;

        // DB 저장
        EmailVerification verification = new EmailVerification();
        verification.setData(email, code, LocalDateTime.now(), false);
        emailVerificationRepository.save(verification);

        // hymeleaf context 생성
        Context context = new Context();
        context.setVariable("title", "[돌보미] 비밀번호 번호 변경 안내");
        context.setVariable("body",
                "<p>비밀번호 재설정 링크는<br/> <strong style='color:#2a7ae4'>" + resetLink
                        + "</strong> 입니다.</p><p>해당 링크를 통해 비밀번호를 변경해주세요.</p>");

        // HTML 렌더링
        String html = templateEngine.process("email-template", context); // email-template.html

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("[돌보미] 비밀번호 변경 링크 안내"); // 이메일 제목
            helper.setText(html, true); // true → HTML 본문으로 인식

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new IllegalStateException("메일 전송 실패");
        }
    }

    public boolean verifyCode(String email, String code) {
        // 1. 해당 이메일(아이디)로 가입된 회원이 있는지?
        if (!userRepositoryV2.findByUserId(email).isPresent()) {
            throw new UserNotFoundException("가입된 회원이 아닙니다.");
        }

        // 2. 해당 이메일에 대해 가장 최근에 요청된 인증 객체 조회
        Optional<EmailVerification> optional = emailVerificationRepository.findTopByEmailOrderByCreatedAtDesc(
                email);

        // 3. 없으면 바로 실패
        if (optional.isEmpty()) {
            return false;

        }

        // 영속성 컨텍스트에 있는 객체 가져오기
        EmailVerification verification = optional.get();

        // 4. 조건 확인: (1) 미인증, (2) 코드 일치, (3) 3분 이내
        if (
                !verification.isVerified() && // (1)
                        verification.getCode().equals(code) && // (2)
                        verification.getCreatedAt().isAfter(LocalDateTime.now().minusMinutes(3)) // (3)
        ) {
            // 5. 인증 상태 변경 후 저장 (DB에 반영)
            verification.changeVerified(true);
            // repository.save(verification); -> 없어도됨

            // 6. 성공
            return true;
        }

        // 7. 조건 만족 못하면 실패
        return false;
    }
}