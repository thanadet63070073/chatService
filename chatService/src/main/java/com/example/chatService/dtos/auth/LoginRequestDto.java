package com.example.chatService.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequestDto {
    @NotBlank(message = "Username is required")
    @Email
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

}
