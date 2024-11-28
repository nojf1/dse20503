package com.example.dse20503_project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dse20503_project.entity.Car;
import com.example.dse20503_project.entity.CarStatus;
import com.example.dse20503_project.entity.User;
import com.example.dse20503_project.repository.CarRepository;
import com.example.dse20503_project.repository.UserRepository;

@Service
public class CarService {
    
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private UserRepository userRepository;

    // Get all cars
    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    // Get car by ID
    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    // Create a new car
    public Car createCar(Car car) {
        if (car.getSeller() == null || car.getSeller().getId() == null) {
            throw new IllegalArgumentException("Seller information is missing or incomplete.");
        }

        User seller = userRepository.findById(car.getSeller().getId())
                .orElseThrow(() -> new RuntimeException("Seller not found with id " + car.getSeller().getId()));
        car.setSeller(seller);
        car.setCreatedAt(LocalDateTime.now());
        car.setUpdatedAt(LocalDateTime.now());
        return carRepository.save(car);
    }

    // Update an existing car
    public Car updateCar(Long id, Car carDetails) {
        return carRepository.findById(id)
                .map(existingCar -> {
                    // Update fields selectively
                    if (carDetails.getBrand() != null) {
                        existingCar.setBrand(carDetails.getBrand());
                    }
                    if (carDetails.getModel() != null) {
                        existingCar.setModel(carDetails.getModel());
                    }
                    if (carDetails.getColor() != null) {
                        existingCar.setColor(carDetails.getColor());
                    }
                    if (carDetails.getLicensePlate() != null) {
                        existingCar.setLicensePlate(carDetails.getLicensePlate());
                    }
                    if (carDetails.getYear() != null && Integer.parseInt(carDetails.getYear()) > 1885) { // Example: Validate year
                        existingCar.setYear(carDetails.getYear());
                    }
                    if (carDetails.getPrice() != null && Integer.parseInt(carDetails.getPrice()) >= 0) { // Example: Validate price
                        existingCar.setPrice(carDetails.getPrice());
                    }
                    if (carDetails.getDescription() != null) {
                        existingCar.setDescription(carDetails.getDescription());
                    }
                    if (carDetails.getImageUrl() != null) {
                        existingCar.setImageUrl(carDetails.getImageUrl());
                    }
                    if (carDetails.getStatus() != null) {
                        existingCar.setStatus(carDetails.getStatus());
                    }
    
                    // Update timestamp
                    existingCar.setUpdatedAt(LocalDateTime.now());
    
                    return carRepository.save(existingCar);
                })
                .orElseThrow(() -> new RuntimeException("Car not found with id " + id)); // Throw exception if not found
    }
    
    // Delete a car
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    // Approve the sale of a car
    public Car approveSale(Long id) {
        return carRepository.findById(id)
                .map(existingCar -> {
                    existingCar.setStatus(CarStatus.SOLD);
                    existingCar.setUpdatedAt(LocalDateTime.now());
                    return carRepository.save(existingCar);
                })
                .orElseThrow(() -> new RuntimeException("Car not found with id " + id));
    }
    

}
