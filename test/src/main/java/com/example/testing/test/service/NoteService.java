package com.example.testing.test.service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.testing.test.DTO.Note;
import com.example.testing.test.Repository.NoteRepository;
import java.time.LocalDateTime;
import com.example.testing.test.Entity.NoteEntity;
@Service
public class NoteService {


    @Autowired
    private NoteRepository noteRepository;
    
    public List<Note> getAllNotes(String userid) {
        Optional<NoteEntity> notes = noteRepository.findById(userid);
        return notes.map(NoteEntity::getNotes).orElseGet(ArrayList::new);
    }

    public Note createNote(String username, Note entity) {
        NoteEntity notes = noteRepository.findById(username).orElse(new NoteEntity());
        notes.setUsername(username);
        notes.addNote(entity);
        noteRepository.save(notes);
        return entity;
    }
    public Note updateNote(String username, String noteId, Note entity) {
        NoteEntity notes = noteRepository.findById(username).orElse(new NoteEntity());
        List<Note> noteList = notes.getNotes();
        int index = Integer.parseInt(noteId);
        if (index >= 0 && index < noteList.size()) {
            Note noteToUpdate = noteList.get(index);
            noteToUpdate.setTitle(entity.getTitle());
            noteToUpdate.setContent(entity.getContent());
            noteToUpdate.setCreatedAt(LocalDateTime.now());
            noteList.set(index, noteToUpdate);
            notes.setNotes(noteList);
            noteRepository.save(notes);
            return noteToUpdate;
        }
        return null; // or throw an exception
    }
    public void deleteNote(String username, String noteId) {
        NoteEntity notes = noteRepository.findById(username).orElse(new NoteEntity());
        List<Note> noteList = notes.getNotes();
        int index = Integer.parseInt(noteId);
        if (index >= 0 && index < noteList.size()) {
            noteList.remove(index);
            notes.setNotes(noteList);
            noteRepository.save(notes);
        }
    }

}
