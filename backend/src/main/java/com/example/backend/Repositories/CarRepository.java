package com.example.backend.Repositories;

import com.example.backend.Entities.CarEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, Integer>, JpaSpecificationExecutor<CarEntity> {

    CarEntity findByRegistrationNumber(String registrationNumber);

    List<CarEntity> findAll(Specification<CarEntity> specification);

    @Query(name= "CarEntityFilter")
    List<CarEntity> filterCars(String brand, String model, String fuelType);
}
