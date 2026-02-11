package com.example.chatService.services;

import com.example.chatService.dtos.auth.LoginRequestDto;
import com.example.chatService.dtos.auth.LoginResponseDto;
import com.example.chatService.dtos.auth.RegisterRequestDto;
import com.example.chatService.dtos.user.UserDto;
import com.example.chatService.models.UserModel;
import com.example.chatService.repositories.UserRepository;
import com.example.chatService.utils.JwtUtil;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class AuthService {

    private final UserService userService;
    private final  UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    AuthService(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public Map<String, String> register(RegisterRequestDto registerData) {
        //step 1: check password match
        if (!registerData.getPassword().equals(registerData.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password and confirm password do not match");
        }

        //step 2: check is email in use
        UserModel foundUserEmail = this.userRepository.findByEmail(registerData.getEmail())
                .orElse(null);

        if  (foundUserEmail != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }

        //step 3: create user object with encoded password
        UserDto user = new UserDto(registerData.getName(), registerData.getEmail(), passwordEncoder.encode(registerData.getPassword()));

        //step 4: add user to database
        return this.userService.createUser(user);
    }

    public LoginResponseDto login(LoginRequestDto loginData) {
        // step 1: find user by email
        UserModel  user = this.userRepository.findByEmail(loginData.getEmail())
                .orElse(null);

        // step 2: check user
        if(user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }


        // step 3: check password
        if(!passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        // step 4: generate JWT
        String jwtToken = jwtUtil.generateToken(user.getId());

        return new LoginResponseDto(jwtToken, "Login successful");
    }
}
