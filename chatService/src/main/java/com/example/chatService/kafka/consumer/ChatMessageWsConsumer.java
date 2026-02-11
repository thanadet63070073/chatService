package com.example.chatService.kafka.consumer;

import com.example.chatService.dtos.chatMessage.ChatMessageEventDto;
import com.example.chatService.dtos.chatMessage.ChatMessageResponseDto;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageWsConsumer {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatMessageWsConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "chat-message", groupId = "chat-ws")
    public void consume(ChatMessageEventDto event) {

        ChatMessageResponseDto response = new ChatMessageResponseDto(
                event.getChatRoomId(),
                event.getSenderId(),
                event.getMessage(),
                event.getSenderName(),
                event.getCreatedDate()
        );

        messagingTemplate.convertAndSend(
                "/topic/chat/" + event.getChatRoomId(),
                response
        );
    }
}
