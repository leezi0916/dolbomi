package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewRepository {
    // 메인(보호자 메인) 리뷰 조회
    List<Review> getMainReviewList(StatusEnum.Status status);

    // 내가쓴 리뷰 조회
    Page<Review> getMyWrittenReviewList(Status status, Pageable pageable, Long userNo);

    // 내가 받은 리뷰 조회
    Page<Review> getReceivedReviewList(Status status, Pageable pageable, Long userNo);
}
