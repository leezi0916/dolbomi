package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.Report;
import com.kh.dolbomi.enums.StatusEnum;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ReportDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Create { //일지 작성
        private Long pat_no;
        private Long care_giver_no;
        private String report_title;
        private String report_content;
        private LocalDateTime create_date;
        private LocalDateTime update_date;
        private StatusEnum.Status status;

        public Report toEntity() {
            return Report.builder()
                    .reportTitle(this.report_title)
                    .reportContent(this.report_content)
                    .createDate(this.create_date)
                    .updateDate(this.update_date)
                    .status(this.status)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response { //일지목록 불러오기
        private Long report_no;
        private String report_title;
        private String user_name;
        private LocalDateTime create_date;
        private String report_content;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update { //일지 수정
        private Long report_no;
        private String report_title;
        private String report_content;
        private LocalDateTime update_date;

    }
}
