package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.enums.StatusEnum;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ProposerDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long proposer_no;
        private Long caregiver_no;
        private String caregiver_name;
        private Integer age; //지원한 간병인 나이
        private StatusEnum.Gender gender;
        private Integer account;
        private boolean has_license; //자격증 있는 지 없는지 여부
        private String address;
        private String profile_image;
        private Long resume_no;
        private String resume_title;
        private LocalDateTime proposer_date;
        private StatusEnum.Status status;

        // 구인 테이블
        private String hiring_title;
        private StatusEnum.HiringStatus hiring_status;

        // 사용자 테이블
        private String user_name;


        public static Response toDto(Proposer proposer) {
            return Response.builder()
                    .proposer_no(proposer.getProposerNo())
                    .caregiver_no(proposer.getCaregiver().getUserNo())
                    .caregiver_name(proposer.getCaregiver().getUserName())
                    .age(proposer.getCaregiver().getAge())
                    .gender(proposer.getCaregiver().getGender())
                    .account(proposer.getResume().getAccount())
                    .has_license(proposer.getCaregiver().getLicenses() != null && !proposer.getCaregiver().getLicenses()
                            .isEmpty())
                    .address(proposer.getCaregiver().getAddress())
                    .profile_image(proposer.getCaregiver().getProfileImage())
                    .resume_no(proposer.getResume().getResumeNo())
                    .resume_title(proposer.getResume().getResumeTitle())
                    .proposer_date(proposer.getProposerDate())
                    .status(proposer.getStatus()) //신청 상태
                    .build();
        }

        public static Response myProposerDto(Proposer proposer) {
            return Response.builder()
                    .proposer_no(proposer.getProposerNo())
                    .hiring_title(proposer.getHiring().getHiringTitle())
                    .proposer_date(proposer.getProposerDate())
                    .user_name(proposer.getHiring().getUser().getUserName())
                    .hiring_status(proposer.getHiring().getHiringStatus())
                    .build();
        }

    }


    //Response 별도, 리스트+카운트 DTO 별도 생성	역할 분리 명확
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ResponseWithCount {
        private int count;
        private List<Response> proposers;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Create {
        private Long hiring_no;
        private Long resume_no;
        private Long caregiver_no;

        public Proposer toEntity(Hiring hiring, Resume resume, User caregiver) {
            return Proposer.builder()
                    .hiring(hiring)
                    .resume(resume)
                    .caregiver(caregiver)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Update {
        private Long hiring_no;
        private Long caregiver_no;
    }


}