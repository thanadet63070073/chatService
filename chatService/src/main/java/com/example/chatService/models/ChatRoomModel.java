package com.example.chatService.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="chatRoom")
public class ChatRoomModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public ChatRoomModel() {}

    public ChatRoomModel(String name) {
        this.name = name;
    }

}
