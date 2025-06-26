package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.dto.ReviewDto;
import com.kh.dolbomi.dto.ReviewDto.Response;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.ReviewRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Response> getMainReviewList() {
        List<Review> reviews = reviewRepository.getMainReviewList(StatusEnum.Status.Y);

        return reviews.stream()
                .map(ReviewDto.Response::mainReviewDto)
                .collect(Collectors.toList());
    }
}
