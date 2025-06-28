package com.kh.dolbomi.service;

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
}
