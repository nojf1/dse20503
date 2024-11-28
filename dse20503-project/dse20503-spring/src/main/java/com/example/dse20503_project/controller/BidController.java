package com.example.dse20503_project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.dse20503_project.entity.Bid;
import com.example.dse20503_project.service.BidService;

@Controller
@RequestMapping("/bids")
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    // Endpoint for getting all bids
    @GetMapping("/all")
    public ResponseEntity<List<Bid>> getAllBids() {
        return new ResponseEntity<>(bidService.getAllBids(), HttpStatus.OK);
    }

    // Endpoint for getting a bid by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bid> getBidById(@PathVariable Long id) {
        return new ResponseEntity<>(bidService.getBidById(id), HttpStatus.OK);
    }

    // Endpoint for creating a new bid
    @PostMapping("/create")
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid) {
        return new ResponseEntity<>(bidService.createBid(bid), HttpStatus.CREATED);
    }

    // Endpoint for placing a bid
    @PostMapping("/place")
    public ResponseEntity<Bid> placeBid(@RequestBody Bid bid) {
        return new ResponseEntity<>(bidService.placeBid(bid), HttpStatus.CREATED);
    }

    // Endpoint for getting the highest bid for a car
    @GetMapping("/highest/{carId}")
    public ResponseEntity<Bid> getHighestBidForCar(@PathVariable Long carId) {
        Bid highestBid = bidService.getHighestBidForCar(carId);
        return new ResponseEntity<>(highestBid, HttpStatus.OK);
    }

    // Endpoint for updating an existing bid
    @PostMapping("/update")
    public ResponseEntity<Bid> updateBid(@RequestParam Long id, @RequestBody Bid bidDetails) {
        return new ResponseEntity<>(bidService.updateBid(id, bidDetails), HttpStatus.OK);
    }

    // Endpoint for deleting a bid
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBid(@PathVariable Long id) {
        bidService.deleteBid(id);
        return new ResponseEntity<>("Bid deleted", HttpStatus.OK);
    }

    // Endpoint for getting bids by car ID
    @GetMapping("/car/{carId}")
    public ResponseEntity<List<Bid>> getBidsByCarId(@PathVariable Long carId) {
        List<Bid> bids = bidService.getBidsByCarId(carId);
        return new ResponseEntity<>(bids, HttpStatus.OK);
    }
}