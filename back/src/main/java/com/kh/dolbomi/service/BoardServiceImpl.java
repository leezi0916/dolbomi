package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.FileDto;
import com.kh.dolbomi.repository.BoardRepository;
import com.kh.dolbomi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final String UPLOAD_PATH = "C:\\dolbomi_file";

    @Transactional
    @Override
    public Long createBoard(BoardDto.Create boardCreate, FileDto.Create fileCreate) throws IOException {
        //사용자 조회
        User user = userRepository.findById(boardCreate.getUser_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        String changeName = null;
        String originName = null;

        // 파일 저장 처리
        if (fileCreate.getFile() != null && !fileCreate.getFile().isEmpty()) {
            originName = fileCreate.getFile()
                    .getOriginalFilename();
            changeName = UUID.randomUUID() + "_" + originName;
            File uploadDir = new File(UPLOAD_PATH);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            fileCreate.getFile()
                    .transferTo(new File(UPLOAD_PATH + changeName));
        }

        // 게시글, 파일 엔티티 생성
        Board board = boardCreate.toEntity();
        board.changeUser(user);
        if (originName != null && changeName != null) {
            com.kh.dolbomi.domain.File file = fileCreate.toEntity();
            file.changeFile(originName, changeName);
            board.addFile(file); // 양방향 연관관계 설정
        }

        // 4. 게시글 저장 (Cascade로 파일도 함께 저장됨)
        return boardRepository.save(board).getBoardNo();
    }

    @Override
    public List<BoardDto> getBoardList(String status, String role) {
        return List.of();
    }
}
