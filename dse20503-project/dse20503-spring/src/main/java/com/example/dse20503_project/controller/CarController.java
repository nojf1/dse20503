package com.example.dse20503_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.dse20503_project.entity.Car;
import com.example.dse20503_project.service.CarService;

@Controller
@RequestMapping("/cars")
public class CarController {
    
    @Autowired
    private CarService carService;

    // Endpoint for getting all cars
    @GetMapping("/all")
    public ResponseEntity<List<Car>> getAllCars() {
        return new ResponseEntity<>(carService.getAllCars(), HttpStatus.OK);
    }

    // Endpoint for getting a car by ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
    try {
        Car car = carService.getCarById(id);
        if (car == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(car, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    // Endpoint for creating a new car
    @PostMapping("/create")
    public ResponseEntity<Car> createCar(@RequestBody Car car) {
        return new ResponseEntity<>(carService.createCar(car), HttpStatus.CREATED);
    }

    // Endpoint for updating an existing car
    @PutMapping("/update/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        return new ResponseEntity<>(carService.updateCar(id, carDetails), HttpStatus.OK);
    }

    // Endpoint for deleting a car
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return new ResponseEntity<>("Car deleted", HttpStatus.OK);
    }

    // Endpoint for approving the sale of a car
    @PostMapping("/approve-sale/{id}")
    public ResponseEntity<Car> approveSale(@PathVariable Long id) {
        return new ResponseEntity<>(carService.approveSale(id), HttpStatus.OK);
    }

}
