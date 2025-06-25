package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.ReviewDto;
import com.kh.dolbomi.service.ReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class ReviewController {

    private final ReviewService reviewService;

    // 메인(보호자 메인) 리뷰 조회
    @GetMapping
    public ResponseEntity<List<ReviewDto.Response>> getReviews() {
        return ResponseEntity.ok(reviewService.getMainReviewList());
    }

}
