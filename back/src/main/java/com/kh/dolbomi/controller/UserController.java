package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.UserDto;
import com.kh.dolbomi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class UserController {

    private final UserService userService;

    //회원 등록
    @PostMapping
    public ResponseEntity<Long> addUser(@RequestBody UserDto.Create createDto) {
        Long userNo = userService.createUser(createDto);
        return ResponseEntity.ok(userNo);
    }

    //아이디 중복 체크
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkUserId(@RequestParam String userId) {
        boolean available = userService.isUserIdAvailable(userId);
        return ResponseEntity.ok(available);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<UserDto.Response> login(@RequestBody UserDto.Login loginDto) {
        UserDto.Response currentUser = userService.loginUser(loginDto.getUser_id(),loginDto.getUser_pwd());

        return ResponseEntity.ok(currentUser);
    }
}
