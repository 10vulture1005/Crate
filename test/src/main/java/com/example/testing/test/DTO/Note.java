package com.example.testing.test.DTO;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class Note {

    String title;
    
    String username;
    String content;
    LocalDateTime createdAt;

    public Note(String username) {
        this.createdAt = LocalDateTime.now();
        this.title = "";
        this.content = "";
        this.username = username;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
