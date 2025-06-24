package com.kh.dolbomi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LicenseDto {
    private Long license_no;  // 자격증 번호 (수정/삭제 판단용)
    private String license_name;
    private String license_publisher;
    private LocalDateTime license_date;
}
