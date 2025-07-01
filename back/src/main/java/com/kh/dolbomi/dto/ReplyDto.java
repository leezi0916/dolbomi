package com.kh.dolbomi.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReplyDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long replyNo;
        private Long user_no;
        private String user_name;
        private String replyContent;
        private LocalDateTime createDate;
        private LocalDateTime updateDate;
    }
}
