package com.example.chatService.dtos.chatMessage;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatMessageRequestDto {
    @NotBlank(message = "message is required")
    private String message;

}
