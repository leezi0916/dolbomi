package com.kh.dolbomi.dto;

import com.kh.dolbomi.domain.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

public class FileDto {

    @Getter
    @AllArgsConstructor
    public static class Create {
        private Long board_no; // 소속 게시글
        private MultipartFile file;

        public File toEntity() {
            return File.builder()
                    .build();
        }
    }


}
