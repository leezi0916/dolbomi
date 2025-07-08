package com.kh.dolbomi.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchDataDto {


    private String region;
    private LocalDate start_date;
    private LocalDate end_date;
    private Integer account;
    private String pat_gender;
    private String home;
    private String keyword;

}
