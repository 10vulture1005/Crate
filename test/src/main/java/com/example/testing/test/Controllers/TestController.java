package com.example.testing.test.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.testing.test.DTO.TestDto;
import com.example.testing.test.service.TestService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TestController {
    @Autowired
    private TestService testService;
    @PostMapping("/register")
    public ResponseEntity<?> registerEndpoint(@RequestBody TestDto body) {

        TestDto savedDto = testService.save(body);

        return ResponseEntity.ok(savedDto);
    }

@PostMapping("/login")
public ResponseEntity<?> loginEndpoint(@RequestBody Map<String, String> body) {
    String id = body.get("username");
    String password = body.get("password");
    if (id == null || password == null) {
        return ResponseEntity.badRequest().body("Username and password are required");
    }
    TestDto user = testService.login(id, password);

    if (user != null) {
        return ResponseEntity.ok(user);
    } else {
        return null;
    }
}

}

