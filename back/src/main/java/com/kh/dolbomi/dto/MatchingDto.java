package com.kh.dolbomi.dto;

import com.kh.dolbomi.enums.StatusEnum;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class MatchingDto {
    private Long resume_no;
    private Long hiring_no;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long mat_no;
        private Long caregiver_no;
        private String user_name;
        private Integer age;
        private StatusEnum.Gender gender;
        private LocalDateTime start_date;
        private StatusEnum.Status status;
//        public static Response toDto(Matching matching) {
//            return Response.builder()
//                    .mat_no(matching.getMatNo())
//                    .user_name(matching.getCaregiver().getUserName())
//                    .age(matching.getCaregiver().getAge())
//                    .gender(matching.getCaregiver().getGender())
//                    .start_date(matching.getStartDate())
//                    .status(matching.getStatus())
//                    .build();
//        }
//

    }
}
