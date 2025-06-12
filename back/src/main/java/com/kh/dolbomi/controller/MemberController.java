package com.kh.dolbomi.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@CrossOrigin // 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class MemberController {

    public void aaa() {

    }
}
