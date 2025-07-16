package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.PageResponse;
import com.kh.dolbomi.dto.ReviewDto;
import com.kh.dolbomi.service.ReviewService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class ReviewController {

    private final ReviewService reviewService;

    // 메인(보호자 메인) 리뷰 조회
    @GetMapping("/simple-list")
    public ResponseEntity<List<ReviewDto.Response>> getReviews() {
        return ResponseEntity.ok(reviewService.getMainReviewList());
    }

    // 내가쓴 리뷰, 내가 받은 리뷰 조회
    @GetMapping("/list")
    public ResponseEntity<Map<String, PageResponse<ReviewDto.Response>>> getReviewsByPage(
            @PageableDefault(size = 6) Pageable pageable,
            @RequestParam Long userNo) {

        Map<String, PageResponse<ReviewDto.Response>> result = new HashMap<>();
        result.put("myWrittenReview", new PageResponse<>(reviewService.getMyWrittenReviewList(pageable, userNo)));
        result.put("receivedReview", new PageResponse<>(reviewService.getReceivedReviewList(pageable, userNo)));

        return ResponseEntity.ok(result);
    }

    // 특정 간병인의 이력서 -> 리뷰정보
    @GetMapping("/detail")
    public ResponseEntity<PageResponse<ReviewDto.Detail>> getReviewsByResumeDetailPage(
            @PageableDefault(size = 4, sort = "review.updateDate", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam Long resumeNo) {

        return ResponseEntity.ok(new PageResponse<>(reviewService.getReviewsByResumeDetailPage(pageable, resumeNo)));
    }

    //리뷰 작성하기
    @PostMapping
    public ResponseEntity<Long> createReview(@RequestBody ReviewDto.Create reviewDto) {
        System.out.println("요청 받은 리뷰 내용: " + reviewDto);
        Long reviewNo = reviewService.createReview(reviewDto);
        return ResponseEntity.ok(reviewNo);
    }

    // 내가 쓴 리뷰 삭제하기
    @PatchMapping("/delete")
    public ResponseEntity<Long> deleteReview(@RequestParam Long reviewNo) {
        reviewService.deleteReview(reviewNo);
        
        return ResponseEntity.ok(reviewNo);
    }

}
