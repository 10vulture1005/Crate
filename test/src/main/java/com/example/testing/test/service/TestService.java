package com.example.testing.test.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.testing.test.DTO.TestDto;
import com.example.testing.test.Entity.TestEntity;
import com.example.testing.test.Repository.TestRepositary;

import java.util.*;
@Service
public class TestService {

    

    @Autowired
    private TestRepositary userRepository;
    public TestDto save(TestDto testDto) {
        TestEntity user = new TestEntity();
        user.setUsername(testDto.getUsername());
        user.setEmail(testDto.getEmail());
        user.setPassword(testDto.getPassword());
        userRepository.save(user);
        return testDto;
    }

    public TestDto login(String username, String password) {
        Optional<TestEntity> user = userRepository.findById(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            TestDto testDto = new TestDto();
            testDto.setUsername(user.get().getUsername());
            testDto.setEmail(user.get().getEmail());
            return testDto;
        }
        return null;
    }


}
