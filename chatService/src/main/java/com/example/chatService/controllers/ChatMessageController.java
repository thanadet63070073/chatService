package com.example.chatService.controllers;

import com.example.chatService.dtos.chatMessage.ChatMessageRequestDto;
import com.example.chatService.dtos.chatMessage.ChatMessageResponseDto;
import com.example.chatService.models.ChatMessageModel;
import com.example.chatService.models.UserModel;
import com.example.chatService.services.ChatMessageService;
import com.example.chatService.services.UserService;
import jakarta.validation.Valid;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ChatMessageController extends BaseController{
    private final ChatMessageService chatMessageService;

    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/chat.send/{chatRoomId}")
    public void chat(
            @DestinationVariable String chatRoomId,
            @Payload @Valid ChatMessageRequestDto chatMessageRequestDto,
            @Header("simpSessionAttributes") Map<String, Object> session
    ) {
        String userId = (String) session.get("userId");

        this.chatMessageService.createChatMessage(chatMessageRequestDto, Long.valueOf(chatRoomId), Long.valueOf(userId));

//        UserModel user = this.userService.getUserById(Long.valueOf(userId));
//
//        ChatMessageResponseDto response = new ChatMessageResponseDto(
//                Long.valueOf(chatRoomId),
//                Long.valueOf(userId),
//                savedMessage.getMessage(),
//                user.getName(),
//                savedMessage.getCreatedDate()
//        );
//
//        messagingTemplate.convertAndSend(
//                "/topic/chat/" + chatRoomId,
//                response
//        );
    }

    @GetMapping("/chat/{roomId}")
    public List<ChatMessageResponseDto> getChatMessageFromChatRoomId(@PathVariable String roomId) {
        return this.chatMessageService.getChatMessagesFromChatRoomId(Long.valueOf(roomId));
    }
}
