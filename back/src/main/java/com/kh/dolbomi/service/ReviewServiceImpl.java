package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.dto.ReviewDto;
import com.kh.dolbomi.dto.ReviewDto.Response;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.ReviewRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    // 메인(보호자 메인) 리뷰 조회
    @Override
    @Transactional(readOnly = true)
    public List<Response> getMainReviewList() {
        List<Review> reviews = reviewRepository.getMainReviewList(StatusEnum.Status.Y);

        return reviews.stream()
                .map(ReviewDto.Response::mainReviewDto)
                .collect(Collectors.toList());
    }

    // 내가쓴 리뷰 조회
    @Override
    public Page<ReviewDto.Response> getMyWrittenReviewList(Pageable pageable, Long userNo) {
        Page<Review> review = reviewRepository.getMyWrittenReviewList(StatusEnum.Status.Y, pageable, userNo);
        return review.map(ReviewDto.Response::MyWrittenReviewDto);
    }

    // 내가 받은 리뷰 조회
    @Override
    public Page<Response> getReceivedReviewList(Pageable pageable, Long userNo) {
        Page<Review> review = reviewRepository.getReceivedReviewList(StatusEnum.Status.Y, pageable, userNo);

        return review.map(ReviewDto.Response::ReceivedReviewDto);
    }
}
