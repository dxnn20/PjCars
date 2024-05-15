package com.example.backend.Controllers;

import com.example.backend.Entities.CarEntity;
import com.example.backend.Services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/create")
    public ResponseEntity<CarEntity> createCar(@RequestBody CarEntity car) {
        CarEntity createdCar = carService.createCar(car);

        return new ResponseEntity<>(createdCar, HttpStatus.CREATED);
    }

    @PutMapping("/modify")
    public ResponseEntity modifyCarByRegistrationNumber(@RequestParam String registrationNumber, @RequestParam String brand, @RequestParam String model, @RequestParam String color, @RequestParam int year, @RequestParam float engineCapacity, @RequestParam String fuelType, @RequestParam int power, @RequestParam int torque, @RequestParam double trunkCapacity, @RequestParam double price) {
        boolean modified = carService.modifyCarByRegistrationNumber(registrationNumber, brand, model, color, year, engineCapacity, fuelType, power, torque, trunkCapacity, price);

        if (modified) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{registrationNumber}")
    public CarEntity getCarByRegistrationNumber(@PathVariable String registrationNumber) {
        return carService.getCarByRegistrationNumber(registrationNumber);
    }

    @GetMapping("/all")
    public List<CarEntity> getAllCars() {
        return carService.getAllCars();
    }

}
