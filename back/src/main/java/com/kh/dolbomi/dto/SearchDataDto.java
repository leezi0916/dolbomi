package com.kh.dolbomi.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class SearchDataDto {


    private Integer page;
    private Integer size;
    private Response changeData; // 실제 검색 조건 DTO


    @Data
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Response {

        private String region;
        private String keyword;
        private LocalDateTime start_date;
        private LocalDate end_date;
        private Integer account;
        private String gender;
        private String home;
    }


}
