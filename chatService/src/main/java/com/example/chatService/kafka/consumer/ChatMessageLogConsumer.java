package com.example.chatService.kafka.consumer;

import com.example.chatService.dtos.chatMessage.ChatMessageEventDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class ChatMessageLogConsumer {

    private static final Logger log =
            LoggerFactory.getLogger(ChatMessageLogConsumer.class);

    @KafkaListener(topics = "chat-message", groupId = "chat-log")
    public void log(ChatMessageEventDto event) {

        log.info("[ROOM:{}][USER:{}] {}",
                event.getChatRoomId(),
                event.getSenderId(),
                event.getMessage()
        );
    }
}
