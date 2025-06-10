package com.example.testing.test.Entity;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import com.example.testing.test.DTO.Note;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.ArrayList;
@Document(collection = "notes")
public class NoteEntity {
    @Id
    String username;
    @Field("notes")
    List<Note> notes;

    public NoteEntity() {
        this.notes = new ArrayList<>();
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getUsername() {
        return username;
    }
    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
    public List<Note> getNotes() {
        if (notes == null) {
            notes = new ArrayList<>();
        }
        return notes;
    }
    public void addNote(Note note) {
        if (notes == null) {
            notes = new ArrayList<>();
        }
        notes.add(note);
    }

}
