package com.example.backend.Repositories;

import com.example.backend.Entities.CarEntity;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<CarEntity, Integer> {

    CarEntity findByRegistrationNumber(String registrationNumber);

    boolean existsByRegistrationNumber(String registrationNumber);

    void deleteByRegistrationNumber(String registrationNumber);

}
