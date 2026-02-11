package com.example.chatService.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="chatMessage")
public class ChatMessageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private Long senderId;

    @Column(nullable = false)
    private Long chatRoomId;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;

    public ChatMessageModel() {}

    public ChatMessageModel(String message, Long senderId, Long chatRoomId) {
        this.message = message;
        this.senderId = senderId;
        this.chatRoomId = chatRoomId;
    }
}
