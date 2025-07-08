package com.kh.dolbomi.controller;


import com.kh.dolbomi.auth.JwtTokenProvider;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.UserCountsDto;
import com.kh.dolbomi.dto.UserDto;
import com.kh.dolbomi.service.UserService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    //회원 등록
    @PostMapping
    public ResponseEntity<Long> addUser(@Valid @RequestBody UserDto.Create createDto) {
        System.out.println(createDto.getSocial_type());
        Long userNo = userService.createUser(createDto);
        return ResponseEntity.ok(userNo);
    }

    //아이디 중복 체크
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkUserId(@Valid @RequestParam String userId) {
        boolean available = userService.isUserIdAvailable(userId);
        return ResponseEntity.ok(available);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDto.Login loginDto) {
        User user = userService.loginUser(loginDto);

        String jwtToken = jwtTokenProvider.createToken(user.getUserId(), user.getRole().toString());
        Map<String, Object> loginInfo = new HashMap<>();
        loginInfo.put("token", jwtToken);
//        UserDto.Response currentUser = userService.loginUser(loginDto.getUser_id(), loginDto.getUser_pwd());

        return new ResponseEntity<>(loginInfo, HttpStatus.OK);
    }

    //로그인 후 내 정보 토큰으로 가져오기
    @GetMapping("/me")
    public ResponseEntity<?> getMemberInfo() {
        //jwt토큰에서 아이디 추출
        String identifier = jwtTokenProvider.getUserIdFromToken(); // 이메일 또는 아이디가 올 수 있음 -> 소셜 로그인때문
        UserDto.Response userInfo;

        if (identifier.contains("@")) {
            // 이메일 형식이면 이메일로 유저 조회
            userInfo = userService.getUserInfoByEmail(identifier);
        } else {
            // 아니면 일반 userId로 유저 조회
            userInfo = userService.getUserInfoByUserId(identifier);
        }

        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }


    //회원 정보 불러오기
    @GetMapping
    public ResponseEntity<UserDto.ProfileDto> getUserProfile(@RequestParam("user_no") Long userNo) {
        UserDto.ProfileDto profile = userService.getUserProfile(userNo);
        return ResponseEntity.ok(profile);
    }

    //회원 수정
    @PatchMapping("/{userNo}")
    public ResponseEntity<UserDto.Response> updateUser(@PathVariable Long userNo,
                                                       @RequestBody UserDto.Update updateDto) {

        return ResponseEntity.ok(userService.updateUser(userNo, updateDto));
    }

    //회원 탈퇴
    @PatchMapping("/{userNo}/delete")
    public ResponseEntity<String> deleteUser(@PathVariable Long userNo) {
        userService.deleteUser(userNo);
        return ResponseEntity.ok("회원탈퇴가 완료되었습니다.");
    }

    //비밀번호 변경


    //메인 페이지 간병사, 보호자 카운트
    @GetMapping("/user-counts")
    public ResponseEntity<UserCountsDto> getUserCounts() {
        UserCountsDto result = userService.getUserCounts();
        return ResponseEntity.ok(result);
    }
}


