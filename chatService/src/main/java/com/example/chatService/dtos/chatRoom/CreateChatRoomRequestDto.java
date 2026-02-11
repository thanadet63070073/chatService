package com.example.chatService.dtos.chatRoom;

import jakarta.validation.constraints.NotBlank;

public class CreateChatRoomRequestDto {
    @NotBlank(message = "name is required")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
