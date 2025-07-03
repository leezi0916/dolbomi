package com.kh.dolbomi.config;

import com.kh.dolbomi.auth.JwtTokenFilter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    /*
     @Bean : 메서드 단위로 빈에 등록할 때, 외부라이브러리의 객체를 등록하고 싶을 때
     */

    private final JwtTokenFilter jwtTokenFilter;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable) //CSRF 보안기능 비활성 -> 세션을 통한 공격(REST에서는 필요없음)
                .httpBasic(AbstractHttpConfigurer::disable) //HTTP Basic인증 비활성(아이디와 비밀번호를 HTTP요청 헤더에 담아서 인증하는 방식)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/users/v1/check",
                                "/users/v1",
                                "/users/v1/login",
                                "/hiring/v1/simple-list",
                                "/resume/v1/simple-list",
                                "/resume/v1/detail/*",
                                "/review/v1/simple-list",
                                "/community/v1/caregiver",
                                "/community/v1/guardian",
                                "/community/v1/question",
                                "/community/v1/detail",
                                "/"

                        ).permitAll()
                        .anyRequest().authenticated() // 위의 요청경로를 제외한 나머지 경로는 인증
                )
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /*
    BCryptPasswordEncoder 객체를 스프링 빈에 등록하고 사용하고 싶지만 외부객체이기 때문에
    직접 클래스 구현부에 @Component를 입력해 등록할 수 없음
    그래서 해당 객체를 만들어서 리턴하는 함수를 만들고 해당 함수를 Bean에 등록하여 객체를 사용한다.
     */


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //요청을 허용할 도메인들
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        //자격증명(쿠키, 인증 헤더) 허용
        configuration.setAllowCredentials(true);

        //위의 설정들은 모든 URL패턴에 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}




