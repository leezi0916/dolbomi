package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.enums.StatusEnum;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ReviewDto {

    @Getter
    @AllArgsConstructor
    @Builder
    @Setter
    public static class Response {
        // ===== 유저 =====
        private String user_name;
        private Integer age;
        private StatusEnum.Gender gender;
        private String address;
        private String profile_image;

        // ===== 리뷰 =====
        private Long review_no;
        private String review_content;
        private BigDecimal review_score;
        private LocalDateTime review_update_date;
        private StatusEnum.Status review_status;

        public static Response mainReviewDto(Review review) {
            return Response.builder()
                    .review_no(review.getReviewNo())
                    .profile_image(review.getWriter().getProfileImage())
                    .user_name(review.getWriter().getUserName())
                    .age(review.getWriter().getAge())
                    .gender(review.getWriter().getGender())
                    .address(review.getWriter().getAddress())
                    .review_content(review.getReviewContent())
                    .review_score(review.getScore())
                    .review_update_date(review.getUpdateDate())
                    .build();
        }
    }
}
