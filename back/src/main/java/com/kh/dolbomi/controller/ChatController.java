package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.chat.MyChatResponse;
import com.kh.dolbomi.service.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/chat")
public class ChatController {

    private final ChatService chatService;

    /*
     * 방번호 / 방이름
     * 메세지 읽을 개수
     *
     * */
    @GetMapping("/my/rooms")
    public ResponseEntity<?> getMyRooms() {
        List<MyChatResponse> myChatResponses = chatService.getMyChatRooms();

        return ResponseEntity.ok(null);
    }


}
