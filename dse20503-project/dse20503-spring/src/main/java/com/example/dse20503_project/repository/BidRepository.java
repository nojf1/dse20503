package com.example.dse20503_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dse20503_project.entity.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long>{

    // Finds bids by car id and orders them by amount in descending order
    List<Bid> findByCarIdOrderByAmountDesc(Long carId);
    
}
