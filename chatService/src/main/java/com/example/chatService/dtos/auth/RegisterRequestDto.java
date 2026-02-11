package com.example.chatService.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequestDto {
    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 4)
    private String password;

    @NotBlank(message = "ConfirmPassword is required")
    @Size(min = 4)
    private String confirmPassword;

    @NotBlank(message = "Name is required")
    private String name;

}
