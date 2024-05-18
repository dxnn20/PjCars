package com.example.backend.Controllers;

import com.example.backend.Security.UserRepository;
import com.example.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Qualifier("userRepository")
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestParam String username, @RequestParam String password) {
        userService.createUser(username, password);
        return ResponseEntity.ok("User created successfully.");
    }

    @PutMapping("/request-company")
    public ResponseEntity<String> requestAdmin(@RequestParam int id) {

        if(userRepository.findById(id).get().getStatus().equals("REJECTED")){
            return ResponseEntity.badRequest().body("User is rejected.");
        }

        if (userService.requestAdmin(id)) {
            return ResponseEntity.ok("Company request sent successfully.");
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    @PutMapping("/approve-company")
    public ResponseEntity<String> approveCompany(@RequestParam int id) {
        if (userService.approveCompany(id)) {
            return ResponseEntity.ok("Company approved successfully.");
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    @PutMapping("/decline-company")
    public ResponseEntity<String> rejectAdmin(@RequestParam int id) {
        if (userService.rejectCompany(id)) {
            return ResponseEntity.ok("Company declined successfully.");
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    @GetMapping("/by-status")
    public ResponseEntity<?> getAllPending(@RequestParam String status) {
        return ResponseEntity.ok(userRepository.findAllByStatus(status));
    }
}