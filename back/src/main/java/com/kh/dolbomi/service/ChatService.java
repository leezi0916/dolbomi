package com.kh.dolbomi.service;

import com.kh.dolbomi.auth.JwtTokenProvider;
import com.kh.dolbomi.domain.ChatParticipant;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.chat.MyChatResponse;
import com.kh.dolbomi.repository.ChatMessageRepository;
import com.kh.dolbomi.repository.ChatParticipantRepository;
import com.kh.dolbomi.repository.ChatRoomRepository;
import com.kh.dolbomi.repository.ReadStatusRepository;
import com.kh.dolbomi.repository.UserRepositoryV2;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Transactional
@Service
public class ChatService {


    private final UserRepositoryV2 userRepositoryV2;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ReadStatusRepository readStatusRepository;

    /**
     * 내 채팅방 조회 내 이메일 번호를 가져오기 내 이메일로 된 채팅방가져오기
     * <p>
     * how..? 채팅방에 대한 읽지 않음 갯수가져오기
     */

    public List<MyChatResponse> getMyChatRooms() {

        User user = userRepositoryV2.findByUserId(jwtTokenProvider.getUserIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<ChatParticipant> chatParticipants = chatParticipantRepository.findByUser(user);

        List<MyChatResponse> dtos = chatParticipants.stream()
                .map(c -> {
                    //각 채팅방의 읽지않은 메세지 수 조회
                    Long count = readStatusRepository.countByChatRoomAndUserAndIsReadFalse(c.getChatRoom(), user);

                    return MyChatResponse.builder()
                            .roomId(c.getChatRoom().getId())
                            .roomName(c.getChatRoom().getName())
                            .unReadCount(count)
                            .build();

                }).collect(Collectors.toList());

        return dtos;
    }

}
