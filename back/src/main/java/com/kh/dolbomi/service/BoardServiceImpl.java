package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Board;
import com.kh.dolbomi.domain.File;
import com.kh.dolbomi.domain.Reply;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.dto.BoardDto.CreateQuestion;
import com.kh.dolbomi.dto.BoardDto.Response;
import com.kh.dolbomi.dto.ReplyDto;
import com.kh.dolbomi.dto.ReplyDto.Create;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.BoardRepository;
import com.kh.dolbomi.repository.BoardRepositoryV2;
import com.kh.dolbomi.repository.FileRepository;
import com.kh.dolbomi.repository.ReplyRepositoryV2;
import com.kh.dolbomi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
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
    private final FileRepository fileRepository;


    @Transactional
    @Override
    public Long createBoard(BoardDto.Create boardCreate) throws IOException {
        //사용자 조회
        User user = userRepository.findById(boardCreate.getUser_no())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        // 게시글, 파일 엔티티 생성
        Board board = boardCreate.toEntity();
        board.changeUser(user);

        // 이미지 파일 리스트가 있다면 File 엔티티로 매핑
        if (boardCreate.getImage_names() != null) {
            for (String imageName : boardCreate.getImage_names()) {
                File file = File.builder()
                        .fileName(imageName)
                        .board(board)
                        .build();
                board.getFileList().add(file);
            }
        }

        //  게시글 저장 (Cascade로 파일도 함께 저장됨)
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
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));

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
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));

        Reply reply = replyCreate.toEntity();
        reply.changeUser(user);
        reply.changeBoard(board);

        board.setQuestionStatus();

        return replyRepositoryV2.save(reply).getReplyNo();
    }

    @Override
    public Long updateBoard(BoardDto.Update boardUpdate) {
        Board board = boardRepository.findByBoardNo(boardUpdate.getBoard_no())
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));
        board.update(boardUpdate);

        //이미지 삭제
        if (boardUpdate.getDeleted_file_nos() != null) {
            for (Long fileNo : boardUpdate.getDeleted_file_nos()) {
                fileRepository.deleteById(fileNo);
            }
        }

        //  기존 파일 리스트 전체 제거 (DB상에서도 제거됨)
        board.getFileList().clear();

        //  새로운 이미지 파일들 추가
        List<File> newFiles = boardUpdate.getImage_names().stream()
                .map(name -> File.builder()
                        .fileName(name)
                        .board(board)
                        .build())
                .toList();

        board.getFileList().addAll(newFiles);

        return boardRepositoryV2.save(board).getBoardNo();
    }

    @Override
    public Long updateReply(ReplyDto.Update replyUpdate) {
        Reply reply = replyRepositoryV2.findByReplyNo(replyUpdate.getReply_no())
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));

        reply.update(replyUpdate);
        return reply.getReplyNo();


    }

    @Override
    public String deleteBoard(Long boardNo) {
        Board board = boardRepositoryV2.findByBoardNo(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));

        board.delete(); //(status = N)으로 변경

        fileRepository.deleteAllByBoard(board); // 연관 파일 DB에서 삭제

        return "게시물 삭제 완료";
    }

    @Override
    public String deleteReply(Long replyNo) {
        Reply reply = replyRepositoryV2.findByReplyNo(replyNo)
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));
        if (reply != null) {
            reply.delete();
            return "댓글 삭제 완료";
        }
        return null;

    }
}
