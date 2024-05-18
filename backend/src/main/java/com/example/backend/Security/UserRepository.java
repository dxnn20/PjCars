package com.example.backend.Security;

import com.example.backend.Entities.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Component
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Query(value="select user from UserEntity user where user.username = ?1")
    UserEntity findByUsername(String username);

    @Query(value="select user from UserEntity user where user.status = ?1")
    List<UserEntity> findAllByStatus(String status);
}
