package com.kh.dolbomi.dto;

import com.kh.dolbomi.enums.StatusEnum;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class MatchingDto {
//    private Long resume_no;
//    private Long hiring_no;


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long mat_no;
        private String user_name;
        private Integer age;
        private String gender;
        private LocalDateTime start_date;
        private StatusEnum.Status status;

//        public static MatchingDto.Response toDto(Matching matching) {
//            return MatchingDto.Response.builder()
//
//                    .mat_no(matching.getMatNo())
//
//                    .start_date(matching.getStartDate())
//
//                    .build();
//        }

    }
}
