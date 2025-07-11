package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.Reply;
import jakarta.validation.constraints.NotBlank;
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
        private String profile_image;
    }

    @Getter
    @AllArgsConstructor
    public static class Create {
        private Long board_no;
        private Long user_no;

        @NotBlank(message = "댓글 내용은 필수입니다.")
        private String reply_content;

        public Reply toEntity() {
            return Reply.builder()
                    .replyContent(this.reply_content)
                    .build();

        }
    }

    @Getter
    @AllArgsConstructor
    public static class Update {

        private Long reply_no;
        @NotBlank(message = "댓글 내용은 필수입니다.")
        private String reply_content;
    }
}
