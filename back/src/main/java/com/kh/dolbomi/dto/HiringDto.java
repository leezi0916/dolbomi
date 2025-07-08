package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.domain.Patient;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.enums.StatusEnum;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class HiringDto {

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

        private LocalDate start_date;
        private LocalDate end_date;

        private Integer max_applicants;
        private StatusEnum.CareStatus care_status;
        private String room_image;

        public Hiring toEntity(Patient patient, User user) {
            return Hiring.builder()
                    .patient(patient)    // pat_no 대신 Patient 객체 세팅
                    .user(user)          // User 엔티티 직접 할당
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

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        //구인 정보
        private Long hiring_no;
        private Long user_no; // 작성자
        private String hiring_title;
        private String hiring_content;
        private Integer account;
        private LocalDateTime create_date;

        private LocalDate start_date;
        private LocalDate end_date;


        private Integer max_applicants;
        private StatusEnum.CareStatus care_status;
        private String room_image;
        private StatusEnum.HiringStatus hiring_status;

        // 내 구인글 관리 -> 몇명 신청했는지
        private Integer applied_count;

        //환자 정보
        private Long pat_no;
        private String pat_name;
        private Integer pat_age;
        private StatusEnum.Gender pat_gender;
        private String pat_address;
        private BigDecimal pat_height;
        private BigDecimal pat_weight;
        private String profile_image;

        // 보호자 정보

        private String phone;

        // 질병 리스트 (ex: ["치매", "당뇨"])
        private List<String> disease_tag;

        // 신청 여부(신청테이블에서 상태 갖고옴)
        private boolean applied;


        public static Response toDto(Hiring hiring) {
            Patient patient = hiring.getPatient();
            User user = hiring.getUser();

            return Response.builder()
                    .hiring_no(hiring.getHiringNo())
                    .hiring_title(hiring.getHiringTitle())
                    .hiring_content(hiring.getHiringContent())
                    .account(hiring.getAccount())
                    .start_date(hiring.getStartDate())
                    .end_date(hiring.getEndDate())
                    .max_applicants(hiring.getMaxApplicants())
                    .care_status(hiring.getCareStatus())
                    .room_image(hiring.getRoomImage())

                    // 환자 정보
                    .pat_no(patient.getPatNo())
                    .pat_name(patient.getPatName())
                    .pat_age(patient.getPatAge())
                    .pat_gender(patient.getPatGender())
                    .pat_address(patient.getPatAddress())
                    .pat_height(patient.getPatHeight())
                    .pat_weight(patient.getPatWeight())
                    .profile_image(patient.getProfileImage())

                    // 보호자 정보
                    .phone(user.getPhone())

                    // 질병 정보 (List<String>)
                    .disease_tag(
                            patient.getDiseaseTags().stream()
                                    .map(diseaseTag -> diseaseTag.getDisease().getDisName())
                                    .toList()
                    )
                    .build();
        }

        //구인 상세보기 용 dto(원래 todto에서 자기가 신청됬냐 안됬냐 여부만 추가됨)
        public static Response Detail(Hiring hiring, boolean applied) {
            Patient patient = hiring.getPatient();
            User user = hiring.getUser();

            return Response.builder()
                    .hiring_no(hiring.getHiringNo())
                    .user_no(user.getUserNo())
                    .hiring_title(hiring.getHiringTitle())
                    .hiring_content(hiring.getHiringContent())
                    .account(hiring.getAccount())
                    .start_date(hiring.getStartDate())
                    .end_date(hiring.getEndDate())
                    .max_applicants(hiring.getMaxApplicants())
                    .care_status(hiring.getCareStatus())
                    .room_image(hiring.getRoomImage())
                    .hiring_status(hiring.getHiringStatus())
                    // 환자 정보
                    .pat_no(patient.getPatNo())
                    .pat_name(patient.getPatName())
                    .pat_age(patient.getPatAge())
                    .pat_gender(patient.getPatGender())
                    .pat_address(patient.getPatAddress())
                    .pat_height(patient.getPatHeight())
                    .pat_weight(patient.getPatWeight())
                    .profile_image(patient.getProfileImage())

                    // 보호자 정보
                    .phone(user.getPhone())

                    // 질병 정보 (List<String>)
                    .disease_tag(
                            patient.getDiseaseTags().stream()
                                    .map(diseaseTag -> diseaseTag.getDisease().getDisName())
                                    .toList()
                    )
                    .applied(applied)
                    .build();
        }

        public static Response mainHiringDto(Hiring hiring) {
            return Response.builder()
                    .hiring_no(hiring.getHiringNo())
                    .profile_image(hiring.getPatient().getProfileImage())
                    .pat_name(hiring.getPatient().getPatName())
                    .pat_age(hiring.getPatient().getPatAge())
                    .pat_gender(hiring.getPatient().getPatGender())
                    .account(hiring.getAccount())
                    .pat_address(hiring.getPatient().getPatAddress())
                    .care_status(hiring.getCareStatus())
                    .build();

        }

        public static Response myHiringDto(Hiring hiring) {
            return Response.builder()
                    .hiring_no(hiring.getHiringNo())
                    .hiring_title(hiring.getHiringTitle())
                    .create_date(hiring.getCreateDate())
                    .hiring_status(hiring.getHiringStatus())
                    .applied_count(hiring.getProposerList() != null ? hiring.getProposerList().size() : 0)
                    .build();
        }


        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Update {

            private String hiring_title;
            private String hiring_content;
            private Integer account;
            private LocalDateTime start_date;
            private LocalDateTime end_date;
            private Integer max_applicants;
            private StatusEnum.CareStatus care_status;
            private String room_image;
        }
    }
}

