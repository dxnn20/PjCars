package com.example.backend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="cars")
@Data
@NoArgsConstructor
@NamedQuery(
        name = "CarEntityFilter",
        query = "SELECT c FROM CarEntity c WHERE (:brand IS NULL OR c.brand = :brand) AND (:model IS NULL OR c.model = :model) AND (:fuelType IS NULL OR c.fuelType = :fuelType)"
)
public class CarEntity {

    @Id
    private String registrationNumber;

    private String brand;
    private String model;
    private String color;
    private int year;
    private double engineCapacity;
    private String fuelType;
    private int power;
    private int torque;
    private double trunkCapacity;
    private double price;

}
