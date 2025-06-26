package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.License;
import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.enums.StatusEnum;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

public class ResumeDto {

    @Getter
    @AllArgsConstructor
    @Builder
    @Setter
    public static class Response {

     
        // ===== 이력서 =====
        private Long resume_no;
        private String resume_title;
        private String resume_content;
        private Integer resume_account;
        private LocalDateTime resume_update_date; // create_date는 업데이트시 값을 추적못하기 때문에 update_date로 설정
        private StatusEnum.CareStatus care_status;
        private StatusEnum.Status status;

        // ===== 유저 =====
        private Long user_no;
        private String user_name;
        private Integer age;
        private String phone;
        private StatusEnum.Gender gender;
        private String address;
        private String email;
        private String profile_image;
        private Double avg_score; //이사람이 받은 리뷰의 평균점수

        // ===== 자격증 =====
        private List<License> license_list;
        private String license_name;
        private String license_publisher;
        private LocalDateTime license_date;
        private boolean has_license; // 자격증 있는지 여부 -> 메인페이지에 사용

        public static Response mainResumeDto(Resume resume) {
            return Response.builder()
                    .resume_no(resume.getResumeNo())
                    .user_name(resume.getUser().getUserName())
                    .age(resume.getUser().getAge())
                    .gender(resume.getUser().getGender())
                    .resume_account(resume.getAccount())
                    .address(resume.getUser().getAddress())
                    .profile_image(resume.getUser().getProfileImage())
                    // 라이센스가 null이 아니고, 비어있지 않으면 true, 하나라도 만족하지 못하면 false
                    .has_license(resume.getUser().getLicenses() != null && !resume.getUser().getLicenses().isEmpty())
                    .build();
        }


        public static Response caregiverListDto(Resume resume, Double avgScore) {
            return Response.builder()
                    .resume_no(resume.getResumeNo())
                    .resume_title(resume.getResumeTitle())
                    .resume_content(resume.getResumeContent())
                    .care_status(resume.getCareStatus())
                    .profile_image(resume.getUser().getProfileImage())
                    .user_name(resume.getUser().getUserName())
                    .age(resume.getUser().getAge())
                    .gender(resume.getUser().getGender())
                    .resume_account(resume.getAccount())
                    .address(resume.getUser().getAddress())
                    .has_license(resume.getUser().getLicenses() != null && !resume.getUser().getLicenses().isEmpty())
                    .avg_score(avgScore != null ? avgScore : 0.0)
                    .build();
        }

        public static Response ResumeListDto(Resume resume) {
            return Response.builder()
                    .resume_no(resume.getResumeNo())
                    .resume_title(resume.getResumeTitle())
                    .status(resume.getStatus())
                    .build();

        }


        //update-response
        public static Response ResumeDto(Resume resume) {
            return Response.builder()
                    .user_no(resume.getUser().getUserNo())
                    .user_name(resume.getUser().getUserId())
                    .age(resume.getUser().getAge())
                    .phone(resume.getUser().getPhone())
                    .address(resume.getUser().getAddress())
                    .gender(resume.getUser().getGender())
                    .profile_image(resume.getUser().getProfileImage())
                    .email(resume.getUser().getEmail())

                    .resume_no(resume.getResumeNo())
                    .resume_account(resume.getAccount())
                    .resume_title(resume.getResumeTitle())
                    .resume_content(resume.getResumeContent())
                    .care_status(resume.getCareStatus())

//                     자격증정보 (List<license>)
                    .license_list(
                            resume.getUser().getLicenses().stream().toList()
                    )
                    .build();
        }
    }


    @Getter
    @AllArgsConstructor
    @Builder
    @Setter
    public static class Create {
        // ===== 이력서 =====
        private Long user_no;
        private String resume_title;
        private String resume_content;
        private Integer account;
        @DateTimeFormat(pattern = "yyyy-mm-dd")
        private LocalDateTime create_date;
        private StatusEnum.CareStatus care_status;
        private StatusEnum.Status status;


        public Resume toEntity(User user) {
            return Resume.builder()
                    .user(user)
                    .resumeTitle(this.resume_title)
                    .resumeContent(this.resume_content)
                    .account(this.account)
                    .updateDate(this.create_date)
                    .careStatus(this.care_status)
                    .build();
        }


    }

    @Getter
    @AllArgsConstructor
    @Setter
    public static class Update {
        // ===== 이력서 =====
        private Long resume_no;
        private String resume_title;
        private String resume_content;
        private Integer account;
        @DateTimeFormat(pattern = "yyyy-mm-dd")
        private LocalDateTime update_date;
        private StatusEnum.CareStatus care_status;
        private String status;
    }
}
