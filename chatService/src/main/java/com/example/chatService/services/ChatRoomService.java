package com.example.chatService.services;

import com.example.chatService.dtos.chatRoom.CreateChatRoomRequestDto;
import com.example.chatService.models.ChatRoomModel;
import com.example.chatService.models.UserModel;
import com.example.chatService.repositories.ChatRoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public List<ChatRoomModel> getAllChatRoom() {
        return this.chatRoomRepository.findAll();
    }

    public Map<String, String> createChatRoom(CreateChatRoomRequestDto chatRoomData) {
        try {
            this.chatRoomRepository.save(new ChatRoomModel(chatRoomData.getName()));
            return Collections.singletonMap("message", "Chat room created successfully");
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }
}
