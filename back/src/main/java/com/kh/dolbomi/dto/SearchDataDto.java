package com.kh.dolbomi.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

public class SearchDataDto {

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HiringSearch {

        private String region;

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate start_date;

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate end_date;

        private Integer account;
        private String pat_gender;
        private String home;
        private String keyword;

    }

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResumeSearch {

        private String region;
        private Integer account;
        private String care_gender;
        private String home;
        private String keyword;

    }

}