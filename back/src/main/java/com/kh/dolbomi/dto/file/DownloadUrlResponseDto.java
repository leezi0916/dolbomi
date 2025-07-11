package com.kh.dolbomi.dto.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DownloadUrlResponseDto {
    private String presigned_url;
    private String file_name;
}
