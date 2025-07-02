package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.enums.StatusEnum;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class BoardDto {

    @Getter
    @AllArgsConstructor
    public static class Create {

        @NotBlank(message = "제목은 필수입니다.")
        private String board_title;
        private String board_content;
        private Long user_no;
        private StatusEnum.Role role;

        public Board toEntity() {
            return Board.builder()
                    .boardTitle(this.board_title)
                    .boardContent(this.board_content)
                    .role(this.role)
                    .build();

        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long board_no;
        private String board_title;
        private String board_content;
        private LocalDateTime create_date;
        private Integer count;
        private Long user_no;
        private String user_name;
        private StatusEnum.Role role;
        private StatusEnum.QuestionStatus questionStatus;
        private List<FileDto.Response> files;
        private List<ReplyDto.Response> reply;

        public static Response toDto(Board board) {
            return Response.builder()
                    .board_no(board.getBoardNo())
                    .board_title(board.getBoardTitle())
                    .board_content(board.getBoardContent())
                    .create_date(board.getCreateDate())
                    .count(board.getCount())
                    .user_no(board.getUser().getUserNo())
                    .user_name(board.getUser().getUserName())
                    .role(board.getRole())
                    .questionStatus(board.getQuestionStatus())
                    .files(
                            board.getFiles().stream()
                                    .map(file -> FileDto.Response.builder()
                                            .fileNo(file.getFileNo())
                                            .originName(file.getOriginName())
                                            .changeName(file.getChangeName())
                                            .filePath(file.getFilePath())
                                            .build())
                                    .toList()
                    )
                    .reply(
                            board.getReply().stream()
                                    .map(reply -> ReplyDto.Response.builder()
                                            .replyNo(reply.getReplyNo())
                                            .user_no(reply.getUser().getUserNo())
                                            .user_name(reply.getUser().getUserName())
                                            .replyContent(reply.getReplyContent())
                                            .createDate(reply.getCreateDate())
                                            .updateDate(reply.getUpdateDate())
                                            .build())
                                    .toList()
                    )
                    .build();
        }

        public static Response toSimpleDto(Board board) {
            return Response.builder()
                    .board_no(board.getBoardNo())
                    .board_title(board.getBoardTitle())
                    .create_date(board.getCreateDate())
                    .count(board.getCount())
                    .user_name(board.getUser().getUserName())
                    .role(board.getRole())
                    .questionStatus(board.getQuestionStatus())
                    .build();
        }
    }
}