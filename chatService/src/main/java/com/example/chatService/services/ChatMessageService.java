package com.example.chatService.services;

import com.example.chatService.dtos.chatMessage.ChatMessageEventDto;
import com.example.chatService.dtos.chatMessage.ChatMessageRequestDto;
import com.example.chatService.dtos.chatMessage.ChatMessageResponseDto;
import com.example.chatService.kafka.producer.ChatMessageProducer;
import com.example.chatService.models.ChatMessageModel;
import com.example.chatService.models.UserModel;
import com.example.chatService.repositories.ChatMessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserService userService;
    private final ChatMessageProducer chatMessageProducer;

    public ChatMessageService(ChatMessageRepository chatMessageRepository,  UserService userService, ChatMessageProducer chatMessageProducer) {
        this.chatMessageRepository = chatMessageRepository;
        this.userService = userService;
        this.chatMessageProducer = chatMessageProducer;
    }

    public void createChatMessage(ChatMessageRequestDto chatMessageRequestDto, Long chatRoomId, Long senderId) {
        try {
            ChatMessageModel savedMessage = this.chatMessageRepository.save(new ChatMessageModel(chatMessageRequestDto.getMessage(), senderId,  chatRoomId));
            UserModel user = this.userService.getUserById(senderId);

            ChatMessageEventDto event = new ChatMessageEventDto(
                    chatRoomId,
                    senderId,
                    savedMessage.getMessage(),
                    user.getName(),
                    savedMessage.getCreatedDate()
            );

            this.chatMessageProducer.sendMessage(event);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    public List<ChatMessageResponseDto> getChatMessagesFromChatRoomId(Long chatRoomId) {
        return this.chatMessageRepository.findChatMessageByChatRoomId(chatRoomId);
    }
}
