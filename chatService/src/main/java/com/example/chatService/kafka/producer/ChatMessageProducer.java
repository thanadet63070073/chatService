package com.example.chatService.kafka.producer;

import com.example.chatService.dtos.chatMessage.ChatMessageEventDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageProducer {
    @Autowired
    private KafkaTemplate<String, ChatMessageEventDto> kafkaTemplate;

    public void sendMessage(ChatMessageEventDto event){
        try {
            kafkaTemplate.send("chat-message", event);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to serialize ChatMessageEventDto", e);
        }
    }

}
