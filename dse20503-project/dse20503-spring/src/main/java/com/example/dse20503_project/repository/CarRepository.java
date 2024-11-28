package com.example.dse20503_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dse20503_project.entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>{
    
}
