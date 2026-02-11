package com.example.chatService.dtos.chatMessage;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageEventDto {
    private Long chatRoomId;
    private Long senderId;
    private String message;
    private String senderName;
    private LocalDateTime createdDate;
}
