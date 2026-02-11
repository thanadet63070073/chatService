package com.example.chatService.dtos.auth;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponseDto {
    private String token;
    private String message;

    public LoginResponseDto(String token, String message) {
        this.token = token;
        this.message = message;
    }

}
