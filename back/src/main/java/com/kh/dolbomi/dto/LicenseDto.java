package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.License;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class LicenseDto {


    public static Response toDto(License license) {
        return new Response(
                license.getLicenseNo(),
                license.getLicenseName(),
                license.getLicensePublisher(),
                license.getLicenseDate()
        );
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long license_no;  // 자격증 번호 (수정/삭제 판단용)
        private String license_name;
        private String license_publisher;
        private LocalDate license_date;
    }


}
