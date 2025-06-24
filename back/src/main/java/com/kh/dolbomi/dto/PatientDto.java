package com.kh.dolbomi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kh.dolbomi.entity.Patient;
import com.kh.dolbomi.entity.User;
import com.kh.dolbomi.enums.StatusEnum;
import lombok.*;

import java.math.BigDecimal;

public class PatientDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {

        private Long guardian_no;
        private String pat_name;
        private Integer pat_age;
        private Integer pat_phone;
        private Patient.Gender pat_gender;
        private Integer pat_weight;
        private Integer pat_height;
        private String pat_address;
        private String pat_content;
        private String status;

        public Patient toEntity(User user) {
            return Patient.builder()
                    .guardian(user)
                    .patName(this.pat_name)
                    .patPhone(this.pat_phone)
                    .patAge(this.pat_age)
                    .patWeight(BigDecimal.valueOf(this.pat_weight))
                    .patHeight(BigDecimal.valueOf(this.pat_height))
                    .profileImage(null)
                    .patGender(this.pat_gender)
                    .patAddress(this.pat_address)
                    .build();
        }
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long pat_no;
        private String pat_name;
        private Integer pat_age;
        private Patient.Gender pat_gender;
        private Integer pat_weight;
        private Integer pat_height;
        private String pat_address;
        private String pat_content;
        private String status;

        public static PatientDto.Response toDto(Patient patient) {
            return PatientDto.Response.builder()
                    .pat_no(patient.getPatNo())
                    .pat_name(patient.getPatName())
                    .pat_age(patient.getPatAge())
                    .pat_gender(patient.getPatGender())
                    .build();
        }

        public static PatientDto.Response toDetailDto(Patient patient) {
            return Response.builder()
                    .pat_no(patient.getPatNo())
                    .pat_name(patient.getPatName())
                    .pat_age(patient.getPatAge())
                    .pat_gender(patient.getPatGender())
                    .pat_weight( patient.getPatWeight().intValue())
                    .pat_height(patient.getPatHeight().intValue())
                    .pat_address(patient.getPatAddress())
                    .pat_content(patient.getPatContent())
                    .build();
        }

    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Update {
        private Long pat_no;
        private String pat_name;
        private Integer pat_age;
        private Integer pat_phone;
        private Patient.Gender pat_gender;
        private Integer pat_weight;
        private Integer pat_height;
        private String pat_address;
        private String pat_content;
        private String status;


        public Patient toEntity() {
            return Patient.builder()
                    .patName(this.pat_name)
                    .patPhone(this.pat_phone)
                    .patAge(this.pat_age)
                    .patWeight(BigDecimal.valueOf(this.pat_weight))
                    .patHeight(BigDecimal.valueOf(this.pat_height))
                    .profileImage(null)
                    .patGender(this.pat_gender)
                    .patAddress(this.pat_address)
                    .build();
        }

    }


}
