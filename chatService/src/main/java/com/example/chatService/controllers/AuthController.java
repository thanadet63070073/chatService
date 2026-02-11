package com.example.chatService.controllers;

import com.example.chatService.dtos.auth.LoginRequestDto;
import com.example.chatService.dtos.auth.LoginResponseDto;
import com.example.chatService.dtos.auth.RegisterRequestDto;
import com.example.chatService.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController extends BaseController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Map<String, String> register(@Valid @RequestBody RegisterRequestDto registerData) {
        return this.authService.register(registerData);
    }

    @PostMapping("/login")
    public LoginResponseDto login(@Valid @RequestBody LoginRequestDto loginData) {
        return this.authService.login(loginData);
    }
}
