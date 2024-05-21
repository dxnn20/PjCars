package com.example.backend.Services;

import com.example.backend.Entities.UserEntity;
import com.example.backend.Security.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
        user.setRole("USER");
        user.setStatus("BASE");
        userRepository.save(user);
    }

    public Boolean requestAdmin(int Id){
        UserEntity user=userRepository.findById(Id).orElse(null);
        if (user!=null)
        {
            user.setStatus("PENDING");
            userRepository.save(user);
            return true;
        }
        else return false;
    }

    public Boolean approveCompany(int Id){
        UserEntity user=userRepository.findById(Id).orElse(null);
        if (user!=null)
        {
            user.setRole("COMPANY");
            user.setStatus("APPROVED");
            userRepository.save(user);
            return true;
        }
        else return false;
    }

    public Boolean rejectCompany(int Id){
        UserEntity user=userRepository.findById(Id).orElse(null);
        if (user!=null)
        {
            user.setRole("USER");
            user.setStatus("REJECTED");
            userRepository.save(user);
            return true;
        }
        else return false;
    }

    public UserEntity getUserById(int Id){
        return userRepository.findById(Id).orElse(null);
    }

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

}
