package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ReviewDto;
import com.kh.dolbomi.dto.ReviewDto.Response;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

    // 메인(보호자 메인) 리뷰 조회
    List<Response> getMainReviewList();

    // 내가쓴 리뷰 조회
    Page<Response> getMyWrittenReviewList(Pageable pageable, Long userNo);

    // 내가 받은 리뷰 조회
    Page<Response> getReceivedReviewList(Pageable pageable, Long userNo);

    // 리뷰 작성
    Long createReview(ReviewDto.Create reviewDto);

    // 특정 간병인의 이력서 상세 -> 리뷰
    Page<ReviewDto.Detail> getReviewsByResumeDetailPage(Pageable pageable, Long resumeNo);

    // 내가 쓴 리뷰 삭제하기
    Long deleteReview(Long reviewNo);
}
