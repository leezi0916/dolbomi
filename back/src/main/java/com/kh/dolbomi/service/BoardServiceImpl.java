package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.domain.Reply;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.Response;
import com.kh.dolbomi.dto.ReplyDto.Create;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.BoardRepository;
import com.kh.dolbomi.repository.BoardRepositoryV2;
import com.kh.dolbomi.repository.ReplyRepositoryV2;
import com.kh.dolbomi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;
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
    private final BoardRepositoryV2 boardRepositoryV2;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ReplyRepositoryV2 replyRepositoryV2;

//    public void createBoard(BoardDto.Create dto) {
    // userNo로 유저 조회 (선택)
    // User user = userRepository.findById(dto.getUserNo()).orElseThrow(...);

//        Board board = dto.toEntity();
    // board.setUser(user); // 필요 시

//        boardRepositoryV2.save(board);
//    }


    @Transactional
    @Override
    public Long createBoard(BoardDto.Create boardCreate) throws IOException {
        //사용자 조회
        User user = userRepository.findById(boardCreate.getUser_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

//        String changeName = null;
//        String originName = null;

        // 파일 저장 처리
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
        Board board = boardCreate.toEntity();
        board.changeUser(user);
//        if (originName != null && changeName != null) {
//            com.kh.dolbomi.domain.File file = fileCreate.toEntity();
//            file.changeFile(originName, changeName);
//            board.addFile(file); // 양방향 연관관계 설정
//        }

        // 4. 게시글 저장 (Cascade로 파일도 함께 저장됨)
        return boardRepositoryV2.save(board).getBoardNo();
    }

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

    @Override
    public Long createReply(Create replyCreate) {
        User user = userRepository.findById(replyCreate.getUser_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        Board board = boardRepository.findByBoardNo(replyCreate.getBoard_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        Reply reply = replyCreate.toEntity();
        reply.changeUser(user);
        reply.changeBoard(board);

        return replyRepositoryV2.save(reply).getReplyNo();
    }


}
