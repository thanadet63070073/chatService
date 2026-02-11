package com.example.chatService.repositories;

import com.example.chatService.models.ChatRoomModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoomModel, String> {

}
