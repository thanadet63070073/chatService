package com.example.chatService.dtos.chatMessage;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class ChatMessageResponseDto {
    private Long chatRoomId;
    private Long senderId;
    private String senderName;
    private String message;
    private LocalDateTime createdDate;

    public ChatMessageResponseDto() {}

    public ChatMessageResponseDto (Long chatRoomId, Long senderId, String message, String senderName, LocalDateTime createdDate) {
        this.chatRoomId = chatRoomId;
        this.senderId = senderId;
        this.message = message;
        this.senderName = senderName;
        this.createdDate = createdDate;
    }

}
