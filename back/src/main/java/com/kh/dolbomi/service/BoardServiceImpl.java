package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.domain.Reply;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.CreateQuestion;
import com.kh.dolbomi.dto.BoardDto.Response;
import com.kh.dolbomi.dto.ReplyDto.Create;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.BoardRepository;
import com.kh.dolbomi.repository.BoardRepositoryV2;
import com.kh.dolbomi.repository.ReplyRepositoryV2;
import com.kh.dolbomi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
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
    public Response getCommunityDetail(Long boardNo,
                                       HttpServletRequest request,
                                       HttpServletResponse response) {
//        return boardRepository.findByBoardNo(boardNo)
//                .map(BoardDto.Response::toDto)
//                .orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다."));
        //
//        Board board = boardRepository.findByBoardNo(boardNo)
//                .orElseThrow(() -> new RuntimeException("게시글 없음"));
//
//        board.increaseViews();
//        return BoardDto.Response.toDto(board);

        // 쿠키에서 조회 기록 확인
        boolean alreadyViewed = false;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("viewed_" + boardNo)) {
                    alreadyViewed = true;
                    break;
                }
            }
        }

        // 게시글 조회
        Board board = boardRepository.findByBoardNo(boardNo)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        // 조회수 증가 조건
        if (!alreadyViewed) {
            board.increaseViews();

            Cookie viewCookie = new Cookie("viewed_" + boardNo, "true");
            viewCookie.setMaxAge(60 * 60); // 1시간
            viewCookie.setPath("/");
            response.addCookie(viewCookie);
        }

        return BoardDto.Response.toDto(board);
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

    @Override
    public Long createQuestion(CreateQuestion questionCreate) {
        User user = userRepository.findById(questionCreate.getUser_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        Board board = questionCreate.toEntity();
        board.changeUser(user);

        return boardRepositoryV2.save(board).getBoardNo();
    }

    @Override
    public Long createReplyQuestion(Create replyCreate) {
        User user = userRepository.findById(replyCreate.getUser_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        Board board = boardRepository.findByBoardNo(replyCreate.getBoard_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        Reply reply = replyCreate.toEntity();
        reply.changeUser(user);
        reply.changeBoard(board);

        board.setQuestionStatus();
        boardRepositoryV2.save(board);

        return replyRepositoryV2.save(reply).getReplyNo();
    }


}
