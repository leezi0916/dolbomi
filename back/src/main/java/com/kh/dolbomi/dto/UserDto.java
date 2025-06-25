package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {
        private String user_id;
        private String user_pwd;
        private String user_name;
        private Integer age;
        private User.Gender gender;
        private String phone;
        private String address;
        private String email;

        public User toEntity() {
            return User.builder()
                    .userId(this.user_id)
                    .userPwd(this.user_pwd)
                    .userName(this.user_name)
                    .age(this.age)
                    .gender(this.gender)
                    .phone(this.phone)
                    .address(this.address)
                    .email(this.email)
                    .build();
        }
    }

    // 2. 로그인 DTO
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Login {
        private String user_id;
        private String user_pwd;
    }

    // 3. 응답 DTO
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long user_no;
        private String user_id;
        private String user_name;
        private String email;
        private User.Gender gender;
        private String phone;
        private String address;
        private Integer age;
        private StatusEnum.Status status;

        public static Response toDto(User user) {
            return Response.builder()
                    .user_no(user.getUserNo())
                    .user_id(user.getUserId())
                    .user_name(user.getUserName())
                    .email(user.getEmail())
                    .gender(user.getGender())
                    .age(user.getAge())
                    .phone(user.getPhone())
                    .address(user.getAddress())
                    .status(user.getStatus())
                    .build();
        }
    }
}
