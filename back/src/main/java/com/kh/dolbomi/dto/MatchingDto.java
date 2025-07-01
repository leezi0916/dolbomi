package com.kh.dolbomi.dto;

import com.kh.dolbomi.enums.StatusEnum;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class MatchingDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {
        private Long resume_no;
        private Long hiring_no;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long mat_no;
        private Long caregiver_no;
        private String user_name;
        private Integer age;
        private StatusEnum.Gender gender;
        private LocalDateTime start_date;
        private StatusEnum.Status status;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponsePat {
        private Long mat_no;
        private String pat_name;
        private Integer pat_age;
        private StatusEnum.Gender pat_gender;
        private LocalDateTime start_date;
        private StatusEnum.Status status;

    }
}
