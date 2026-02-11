package com.example.chatService.controllers;

import com.example.chatService.dtos.chatRoom.CreateChatRoomRequestDto;
import com.example.chatService.models.ChatRoomModel;
import com.example.chatService.models.UserModel;
import com.example.chatService.services.ChatRoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ChatRoomController extends BaseController{
    @Autowired
    ChatRoomService chatRoomService;

    @GetMapping("/chatrooms")
    public List<ChatRoomModel> getAllChatRooms(){
            return this.chatRoomService.getAllChatRoom();
    }

    @PostMapping("/chatroom")
    public Map<String, String> createChatRoom(@Valid @RequestBody CreateChatRoomRequestDto createChatRoomData) {
        return this.chatRoomService.createChatRoom(createChatRoomData);
    }
}
