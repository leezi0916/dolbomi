package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.EmailVerification;
import com.kh.dolbomi.exception.UserAlreadyExistsException;
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

    public void sendCode(String email) {
        // 해당 이메일(아이디)로 가입된 회원이 있는지?
        if (userRepositoryV2.findByUserId(email).isPresent()) {
            throw new UserAlreadyExistsException("이미 가입된 이메일입니다.");
        }

        String code = String.format("%06d", new Random().nextInt(999999));

        // DB 저장
        EmailVerification verification = new EmailVerification();
        verification.setData(email, code, LocalDateTime.now(), false);
        emailVerificationRepository.save(verification);

        // 🔥 HTML 메일 본문 코드만 다르게 구성
        String body = "<p>이메일 인증코드는 <strong style='color:#2a7ae4; font-size: 20px;'>" + code + "</strong> 입니다.</p>"
                + "<p>해당 코드를 입력하여 인증을 완료해주세요.</p>";

        Context context = new Context();
        context.setVariable("title", "[돌보미] 이메일 인증코드 안내");
        context.setVariable("body", body);
        context.setVariable("type", "code");

        String html = templateEngine.process("email-template", context); // email-template.html

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("[돌보미] 이메일 인증코드 안내");
            helper.setText(html, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new IllegalStateException("메일 전송 실패");
        }
    }

    public void sendResetLink(String email) {
        // 해당 이메일(아이디)로 가입된 회원이 있는지?
        if (!userRepositoryV2.findByUserId(email).isPresent()) {
            throw new UserNotFoundException("가입된 회원이 아닙니다.");
        }

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
        context.setVariable("type", "reset");

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

        // 1. 해당 이메일에 대해 가장 최근에 요청된 인증 객체 조회
        Optional<EmailVerification> optional = emailVerificationRepository.findTopByEmailOrderByCreatedAtDesc(
                email);

        // 2. 없으면 바로 실패
        if (optional.isEmpty()) {
            return false;

        }

        // 영속성 컨텍스트에 있는 객체 가져오기
        EmailVerification verification = optional.get();

        // 3. 조건 확인: (1) 미인증, (2) 코드 일치, (3) 3분 이내
        if (
                !verification.isVerified() && // (1)
                        verification.getCode().equals(code) && // (2)
                        verification.getCreatedAt().isAfter(LocalDateTime.now().minusMinutes(3)) // (3)
        ) {
            // 4. 인증 상태 변경 후 저장 (DB에 반영)
            verification.changeVerified(true);
            // repository.save(verification); -> 없어도됨

            // 5. 성공
            return true;
        }

        // 6. 조건 만족 못하면 실패
        return false;
    }
}