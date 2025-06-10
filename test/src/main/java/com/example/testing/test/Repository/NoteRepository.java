package com.example.testing.test.Repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.testing.test.DTO.Note;
import com.example.testing.test.Entity.NoteEntity;

public interface NoteRepository extends MongoRepository<NoteEntity, String> {
    NoteEntity findByUsername(String username);
}