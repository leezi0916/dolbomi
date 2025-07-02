package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.Response;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.BoardRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {
    //    private final BoardRepositoryV2 boardRepositoryV2;
    private final BoardRepository boardRepository;

    //    private final UserRepository userRepository;
//    private final String UPLOAD_PATH = "C:\\dolbomi_file";
//
//    @Transactional
//    @Override
//    public Long createBoard(BoardDto.Create boardCreate, FileDto.Create fileCreate) throws IOException {
//        //사용자 조회
//        User user = userRepository.findById(boardCreate.getUser_no())
//                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));
//
//        String changeName = null;
//        String originName = null;
//
//        // 파일 저장 처리
//        if (fileCreate.getFile() != null && !fileCreate.getFile().isEmpty()) {
//            originName = fileCreate.getFile()
//                    .getOriginalFilename();
//            changeName = UUID.randomUUID() + "_" + originName;
//            File uploadDir = new File(UPLOAD_PATH);
//            if (!uploadDir.exists()) {
//                uploadDir.mkdirs();
//            }
//
//            fileCreate.getFile()
//                    .transferTo(new File(UPLOAD_PATH + changeName));
//        }
//
//        // 게시글, 파일 엔티티 생성
//        Board board = boardCreate.toEntity();
//        board.changeUser(user);
//        if (originName != null && changeName != null) {
//            com.kh.dolbomi.domain.File file = fileCreate.toEntity();
//            file.changeFile(originName, changeName);
//            board.addFile(file); // 양방향 연관관계 설정
//        }
//
//        // 4. 게시글 저장 (Cascade로 파일도 함께 저장됨)
//        return boardRepositoryV2.save(board).getBoardNo();
//    }
//
    @Override
    public Page<Response> getGuardianList(Pageable pageable) {
        return boardRepository.findByStatus(StatusEnum.Status.Y, StatusEnum.Role.G, pageable)
                .map(BoardDto.Response::toSimpleDto);
    }

    @Override
    public Page<Response> getCaregiverList(Pageable pageable) {
        return boardRepository.findByStatus(StatusEnum.Status.Y, StatusEnum.Role.C, pageable)
                .map(BoardDto.Response::toSimpleDto);
    }

    @Override
    public Page<Response> getQuestionList(Pageable pageable) {
        return boardRepository.findByStatus(StatusEnum.Status.Y, StatusEnum.Role.Q, pageable)
                .map(BoardDto.Response::toSimpleDto);
    }

    @Override
    public Page<Response> getQuestionHistory(Long userNo, Pageable pageable) {
        return boardRepository.findByUserNo(StatusEnum.Status.Y, StatusEnum.Role.Q, userNo, pageable)
                .map(BoardDto.Response::toSimpleDto);
    }

    @Override
    public Response getCommunityDetail(Long boardNo) {
        return boardRepository.findByBoardNo(boardNo)
                .map(BoardDto.Response::toDto)
                .orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다."));


    }
}
