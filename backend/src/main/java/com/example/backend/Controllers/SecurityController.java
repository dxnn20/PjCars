package com.example.backend.Controllers;

import com.example.backend.Entities.Role;
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

    @GetMapping
    public String security() throws JsonProcessingException{
        Map <String, Object> responseBody= new HashMap<>();

        responseBody.put("logged in", true);

        ObjectMapper objectMapper=new ObjectMapper();
        String json=objectMapper.writeValueAsString(responseBody);

        return json;
    }

    @GetMapping("/security/user")
    public String securityUser() throws JsonProcessingException{
        return Role.valueOf("USER").toString();
    }

    @GetMapping("/security/admin")
    public String securityAdmin() throws JsonProcessingException{
        return Role.valueOf("ADMIN").toString();
    }

    @PostMapping("/security/sign-up")
    public String signUp(String username, String password) throws JsonProcessingException {
        userService.createUser(username, password);
        return "User created";
    }
}
