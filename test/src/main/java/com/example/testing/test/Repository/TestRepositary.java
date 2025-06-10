package com.example.testing.test.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.testing.test.Entity.TestEntity;

public interface TestRepositary extends MongoRepository<TestEntity, String> {
    TestEntity findByUsername(String username);
}
