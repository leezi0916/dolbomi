package com.kh.dolbomi.controller;

import com.kh.dolbomi.domain.File;
import com.kh.dolbomi.dto.file.CompleteUploadRequestDto;
import com.kh.dolbomi.dto.file.DownloadUrlResponseDto;
import com.kh.dolbomi.dto.file.UploadUrlResponseDto;
import com.kh.dolbomi.service.FileService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/v1/files")
@RestController
@RequiredArgsConstructor
public class FileController {

    public final FileService fileService;

    @PostMapping("/upload-url")
    public ResponseEntity<UploadUrlResponseDto> getUploadUrl(@RequestParam String fileName,
                                                             @RequestParam String contentType,
                                                             @RequestParam(required = false, defaultValue = "") String path) {

        //확장자 추출
        String extention = "";
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex > 0) {
            extention = fileName.substring(lastDotIndex);
        }

        //경로 + 변경된이름 + 확장자 =저장할 이름
        String changeName = path + UUID.randomUUID() + extention;
        String presignedUrl = fileService.generatePresignedUploadUrl(changeName, contentType);

        return ResponseEntity.ok(new UploadUrlResponseDto(changeName, presignedUrl));
    }

    @GetMapping("/{fileId}/download-url")
    public ResponseEntity<?> getDownloadUrl(@PathVariable Long fileId) {
        File file = fileService.getFile(fileId);
        String presignedUrl = fileService.generatePresignedDownloadUrl(file.getChangeName());

        return ResponseEntity.ok(new DownloadUrlResponseDto(presignedUrl, file.getChangeName()));
    }

    @PostMapping("/complete")
    public ResponseEntity<File> completeUpload(@RequestBody CompleteUploadRequestDto request) {
        File file = fileService.saveFileInfo(request.getOriginal_name(),
                request.getChange_name(),
                request.getContent_type());

        return ResponseEntity.ok(file);
    }

    @GetMapping
    public ResponseEntity<List<File>> getAllFiles() {
        return ResponseEntity.ok(fileService.getAllFiles());
    }
}
