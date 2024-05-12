package com.example.backend.Services;

import com.example.backend.Entities.UserEntity;
import com.example.backend.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserEntity validateUser(String username, String password, UserRepository userRepository)
    {
        UserEntity user=userRepository.findByUsername(username);

        if (user!=null)
        {
            if (Objects.equals(user.getPassword(), password)) return user;
            else return null;
        }
        else return null;
    }

    public void createUser(String username, String password) {
        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
    }

}
