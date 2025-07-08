package com.kh.dolbomi.service;

import com.kh.dolbomi.auth.JwtTokenProvider;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.enums.SocialType;
import com.kh.dolbomi.repository.UserRepositoryV2;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

// Oauth2 인증에 성공했을 때 호출
@RequiredArgsConstructor
@Service
public class GoogleOauth2LoginSuccess extends SimpleUrlAuthenticationSuccessHandler {
    private final UserRepositoryV2 userRepositoryV2;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        // OAuth2User는 인증된 사용자의 정보를 담는 객체(Google에서 반환한 사용자 json포함)
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        /* 만약 여러가지 플랫폼을 통해서 oauth2인증을 진행시 아래코드로 분기처리 후 사용
        String registrationId = ((OAuth2AuthenticationToken)authentication).getAuthorizedClientRegistrationId().toUpperCase();

        SocialType socialType = SocialType.valueOf(registrationId); // google 또는 kakao
         */

        // Google에서 지원하는 정보 추출
        String openId = oAuth2User.getAttribute("sub");

        String email = oAuth2User.getAttribute("email");
        // 소셜 타입 - 구글
        String socialType = "GOOGLE";

        // 이름
        String name = oAuth2User.getAttribute("name") != null ? oAuth2User.getAttribute("name") : "구글 사용자";

        // 한글 이름을 URL 인코딩 처리 -> 안하면 에러남
        String encodedName = URLEncoder.encode(name, StandardCharsets.UTF_8);

        // 이메일 인증여부 - 회원가입시
        String emailVerified = oAuth2User.getAttribute("email_verified") != null
                ? oAuth2User.getAttribute("email_verified").toString()
                : "false";

        // 구글로 가입한 아이디가 있는지 확인
        User user = userRepositoryV2.findBySocialIdAndSocialType(openId, SocialType.GOOGLE).orElse(null);

        if (user == null) {

            String signupRedirectUrl =
                    "http://localhost:5173/signup?email=" + email + "&name=" + encodedName + "&socialType="
                            + socialType + "&openId=" + openId + "&verified=" + emailVerified;
            response.sendRedirect(signupRedirectUrl);
            return;
        }

        String jwtToken = jwtTokenProvider.createToken(user.getEmail(), user.getRole().toString());

        System.out.println("userEmail : " + user.getEmail());

        Cookie jwtCookie = new Cookie("token", jwtToken);
        jwtCookie.setPath("/"); //모든 경로에서 쿠키 사용가능
        response.addCookie(jwtCookie);

        response.sendRedirect("http://localhost:5173");

    }

}