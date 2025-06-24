package com.kh.dolbomi.dto;

import com.kh.dolbomi.entity.Hiring;
import com.kh.dolbomi.entity.Patient;
import com.kh.dolbomi.entity.User;
import com.kh.dolbomi.enums.StatusEnum;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


public class HiringDto{


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        private Long pat_no;  // 프론트에서 환자 번호만 받는 경우
        private User user;    // 작성자 (보호자) - User 엔티티로 받아야 함
        private String hiring_title;
        private String hiring_content;
        private Integer account;
        private LocalDateTime start_date;
        private LocalDateTime end_date;
        private Integer max_applicants;
        private StatusEnum.CareStatus care_status;
        private String room_image;

        public Hiring toEntity(Patient patient) {
            return Hiring.builder()
                    .patient(patient)                // pat_no 대신 Patient 객체 세팅
                    .user(this.user)                // User 엔티티 직접 할당
                    .hiringTitle(this.hiring_title)
                    .hiringContent(this.hiring_content)
                    .account(this.account)
                    .startDate(this.start_date)
                    .endDate(this.end_date)
                    .maxApplicants(this.max_applicants)
                    .careStatus(this.care_status)
                    .roomImage(this.room_image)
                    .build();
        }
    }

}

