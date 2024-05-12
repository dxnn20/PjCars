package com.example.backend.Repositories;

import com.example.backend.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Query(value="select user from UserEntity user where user.username = ?1")
    UserEntity findByUsername(String username);
}
