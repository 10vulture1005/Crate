package com.example.testing.test.Controllers;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.testing.test.service.NoteService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.testing.test.DTO.Note;
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.GetMapping;
import java.util.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class NoteController {

    @Autowired
    private NoteService noteService;


    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{userid}/shownotes")
    public ResponseEntity<List<Note>> getAllNotes(@PathVariable String userid) {
        List<Note> notes = noteService.getAllNotes(userid);
        return ResponseEntity.ok(notes);
    }


    @PostMapping("/{userid}/notes")
    public ResponseEntity<Note> postMethodName(@PathVariable String userid, @RequestBody Note entity) {
        Note createdNote = noteService.createNote(userid, entity);
        return ResponseEntity.ok(createdNote);
    }


    @PutMapping("/{userid}/notes/{noteId}")
    public ResponseEntity<Note> updateNote(@PathVariable String userid, @PathVariable String noteId, @RequestBody Note entity) {
        Note noteToUpdate = noteService.updateNote(userid, noteId, entity);

        return ResponseEntity.ok(noteToUpdate);
    }
    @DeleteMapping("/{userid}/notes/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable String userid, @PathVariable String noteId) {
        noteService.deleteNote(userid, noteId);
        return ResponseEntity.noContent().build();
    }

}
