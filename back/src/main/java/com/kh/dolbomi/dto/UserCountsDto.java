package com.kh.dolbomi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserCountsDto {
    private int guardianCount;
    private int caregiverCount;
}