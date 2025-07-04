package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ReviewDto;
import com.kh.dolbomi.dto.ReviewDto.Create;
import com.kh.dolbomi.dto.ReviewDto.Detail;
import com.kh.dolbomi.dto.ReviewDto.Response;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.MatchingRepositoryV2;
import com.kh.dolbomi.repository.ResumeRepositoryV2;
import com.kh.dolbomi.repository.ReviewRepository;
import com.kh.dolbomi.repository.ReviewRepositoryV2;
import com.kh.dolbomi.repository.UserRepositoryV2;
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
    private final ReviewRepositoryV2 reviewRepositoryV2;
    private final MatchingRepositoryV2 matchingRepositoryV2;
    private final UserRepositoryV2 userRepositoryV2;
    private final ResumeRepositoryV2 resumeRepositoryV2;

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


    @Override
    public Long createReview(Create reviewDto) {
        //매칭 정보 조회
        Matching matching = matchingRepositoryV2.findById(reviewDto.getMat_no())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매칭입니다."));

        //리뷰 작성자 조회
        User writer = userRepositoryV2.findById(reviewDto.getReview_writer_no())
                .orElseThrow(() -> new IllegalArgumentException("작성자 유저 정보가 없습니다."));

        // 리뷰 저장
        Review review = Review.builder()
                .writer(writer)
                .reviewContent(reviewDto.getReview_content())
                .score(reviewDto.getScore())
                .build();

        Review saved = reviewRepositoryV2.save(review);

        // 매칭에 리뷰 연결
        matching.connectReview(saved);
        matchingRepositoryV2.save(matching);

        return saved.getReviewNo();
    }

    @Transactional(readOnly = true)
    @Override
    public Page<ReviewDto.Detail> getReviewsByResumeDetailPage(Pageable pageable, Long resumeNo) {
        //이력서 조회
        Resume resume = resumeRepositoryV2.findById(resumeNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        //이력서 작성자 (간병사 조회)
        Long caregiverNo = resume.getUser().getUserNo();

        Page<Review> reviews = matchingRepositoryV2.findReviewsByCaregiverAndStatus(caregiverNo, StatusEnum.Status.Y,
                pageable);

        Page<ReviewDto.Detail> result = reviews.map(review -> Detail.ResumeReviewDetailDto(review, caregiverNo));
        return result;
    }


}
