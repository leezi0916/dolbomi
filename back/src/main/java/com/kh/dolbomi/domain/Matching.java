package com.kh.dolbomi.domain;

import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MATCHING")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Matching {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MAT_NO")
    private Long matNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAREGIVER_NO", nullable = false)
    private User caregiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAT_NO", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REVIEW_NO")
    private Review review;

    @Column(name = "STATUS", nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.Status status;

    @Column(name = "START_DATE", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "END_DATE")
    private LocalDateTime endDate;

    @PrePersist
    public void prePersist() {
        this.startDate = LocalDateTime.now();

        if (status == null) {
            this.status = StatusEnum.Status.Y;
        }
    }


    public void updateStatus(Status matchingStatus) {
        this.status = matchingStatus;
    }

    //리뷰 작성시 매칭이블에 리뷰번호 연결
    public void connectReview(Review review) {
        this.review = review;
        if (review.getMatchingList() != null && review.getMatchingList().contains(this)) {
            review.getMatchingList().add(this);
        }
    }
}