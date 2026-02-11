package com.example.chatService.repositories;

import com.example.chatService.dtos.chatMessage.ChatMessageResponseDto;
import com.example.chatService.models.ChatMessageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessageModel, String> {

    @Query("""
      SELECT new  com.example.chatService.dtos.chatMessage.ChatMessageResponseDto(
        cm.id,
        cm.senderId,
        cm.message,
        u.name,
        cm.createdDate
       )
      FROM ChatMessageModel cm
      LEFT JOIN UserModel u ON u.id = cm.senderId
      WHERE cm.chatRoomId = :chatRoomId
      ORDER BY cm.createdDate
    """)
    List<ChatMessageResponseDto> findChatMessageByChatRoomId(Long chatRoomId);
}
