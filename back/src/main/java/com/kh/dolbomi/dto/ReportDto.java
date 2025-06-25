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
    public static class Create {
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
    @Builder
    public static class Response {
        private Long report_no;
        private Long care_giver_no;
        private Long pat_no;
        private String report_title;
        private String report_content;
        private LocalDateTime create_date;
        private LocalDateTime update_date;
        private StatusEnum.Status status;

        public static Response toDto(Report report, String userName) {
            return Response.builder()
                    .report_no(report.getReportNo())
                    .care_giver_no(report.getUser().getUserNo())
                    .pat_no(report.getPatient().getPatNo())
                    .report_title(report.getReportTitle())
                    .report_content(report.getReportContent())
                    .create_date(report.getCreateDate())
                    .update_date(report.getUpdateDate())
                    .status(report.getStatus())
                    .build();
        }
    }
}
