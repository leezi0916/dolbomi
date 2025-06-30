package com.kh.dolbomi.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kh.dolbomi.enums.StatusEnum;
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
@Table(name = "PROPOSER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Proposer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROPOSER_NO")
    private Long proposerNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HIRING_NO", nullable = false)
    private Hiring hiring;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAREGIVER_NO", nullable = false)
    private User caregiver;

    @Column(name = "Status", length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.Status status;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @Column(name = "PROPOSER_DATE", nullable = false)
    private LocalDateTime proposerDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RESUME_NO", nullable = false)
    private Resume resume;

    @PrePersist
    public void prePersist() {
        this.proposerDate = LocalDateTime.now();

        if (status == null) {
            this.status = StatusEnum.Status.N;
        }
    }


    //매칭 수락시 신청상태도 같이 수락된 상태로 변경
    public void updateStatus(StatusEnum.Status newStatus) {
        this.status = newStatus;
    }

}
