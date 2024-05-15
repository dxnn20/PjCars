package com.example.backend.Controllers;

import com.example.backend.Security.UserRepository;
import com.example.backend.Services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class SecurityController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String security() throws JsonProcessingException{
        Map <String, Object> responseBody= new HashMap<>();

        responseBody.put("logged in", true);

        ObjectMapper objectMapper=new ObjectMapper();
        String json=objectMapper.writeValueAsString(responseBody);

        return json;
    }

    @PostMapping("/security/sign-up")
    public String signUp(String username, String password) {
        userService.createUser(username, password);
        return "User created";
    }

    @PostMapping("/security/sign-in")
    public String signIn(String username, String password) {
        return userService.validateUser(username, password, userRepository).toString();
    }
}
