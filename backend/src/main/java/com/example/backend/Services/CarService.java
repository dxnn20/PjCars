package com.example.backend.Services;

import com.example.backend.Entities.CarEntity;
import com.example.backend.Repositories.CarRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public boolean modifyCarByRegistrationNumber(String registrationNumber, String brand, String model, String color, int year, float engineCapacity, String fuelType, int power, int torque, double trunkCapacity, double price) {
        CarEntity car = carRepository.findByRegistrationNumber(registrationNumber);
        if (car != null) {
            // Update the properties
            car.setBrand(brand);
            car.setModel(model);
            car.setColor(color);
            car.setYear(year);
            car.setEngineCapacity(engineCapacity);
            car.setFuelType(fuelType);
            car.setPower(power);
            car.setTorque(torque);
            car.setTrunkCapacity(trunkCapacity);
            car.setPrice(price);

            // Save the modified entity
            carRepository.save(car);
            return true;
        }
        return false; // Car not found
    }

    public CarEntity createCar(CarEntity car) {
        return carRepository.save(car);
    }

    public List<CarEntity> getAllCars() {
        return carRepository.findAll();
    }

    public CarEntity getCarByRegistrationNumber(String registrationNumber) {
        return carRepository.findByRegistrationNumber(registrationNumber);
    }
}
