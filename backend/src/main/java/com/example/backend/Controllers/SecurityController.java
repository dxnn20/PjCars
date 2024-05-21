package com.example.backend.Controllers;

import com.example.backend.Entities.UserEntity;
import com.example.backend.Security.UserRepository;
import com.example.backend.Services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class SecurityController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String security() throws JsonProcessingException {
        Map<String, Object> responseBody = new HashMap<>();

        responseBody.put("logged in", true);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(responseBody);

        return json;
    }

    @PostMapping("/security/sign-up")
    public String signUp(@RequestParam String username,@RequestParam String password) {

        List<UserEntity> users = userRepository.findAll();

        for (UserEntity user : users) {
            if (user.getUsername().equals(username)) {
                return "Username already exists";
            }
        }

        userService.createUser(username, password);
        return "User created";
    }

    @PostMapping("/security/sign-in")
    public ResponseEntity<?> signIn(@RequestParam String username,@RequestParam String password) {
        UserEntity user = userService.validateUser(username, password, userRepository);
        if (user != null) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                String json = mapper.writeValueAsString(user);
                return ResponseEntity.ok(json);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Bad credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
