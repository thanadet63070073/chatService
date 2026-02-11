package com.example.chatService.services;

import com.example.chatService.dtos.user.UserDto;
import com.example.chatService.models.UserModel;
import com.example.chatService.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserModel> getAllUser(){
        return this.userRepository.findAll();
    }

    public UserModel getUserById(Long userId){
        return this.userRepository.findById(String.valueOf(userId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));
    }

    public Map<String, String> createUser(UserDto userModel){
        try {
            this.userRepository.save(new UserModel(userModel.getName(), userModel.getEmail(), userModel.getPassword()));
            return Collections.singletonMap("message", "User created successfully");
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }
}
