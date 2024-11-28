package com.example.dse20503_project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dse20503_project.entity.Bid;
import com.example.dse20503_project.repository.BidRepository;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    // Get all bids
    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    // Get bid by id
    public Bid getBidById(Long id) {
        return bidRepository.findById(id).orElse(null);
    }

    // Create a new bid
    public Bid createBid(Bid bid) {
        bid.setCreatedAt(LocalDateTime.now());
        bid.setUpdatedAt(LocalDateTime.now());
        return bidRepository.save(bid);
    }

    // Update an existing bid (for sellers)
    public Bid updateBid(Long id, Bid bidDetails) {
        return bidRepository.findById(id)
                .map(existingBid -> {
                    // Update amount if provided and valid
                    if (bidDetails.getAmount() != null && bidDetails.getAmount() >= 0) {
                        existingBid.setAmount(bidDetails.getAmount());
                    }

                    // Ensure createdAt is not updated
                    existingBid.setUpdatedAt(LocalDateTime.now()); // Only update the updatedAt field
                    return bidRepository.save(existingBid);
                })
                .orElseThrow(() -> new RuntimeException("Bid not found with id " + id));
    }

    // Delete a bid
    public void deleteBid(Long id) {
        bidRepository.deleteById(id);
    }

    // Allow a user to place a bid
    public Bid placeBid(Bid bid) {
        LocalDateTime now = LocalDateTime.now();
        if (bid.getBidExpiresAt().isBefore(now)) {
            throw new IllegalArgumentException("Cannot place bid. The bid has expired.");
        }
        if (bid.getAmount() < 0) {
            throw new IllegalArgumentException("Bid amount must be non-negative");
        }
        bid.setCreatedAt(now);
        bid.setUpdatedAt(now);
        // Save new bid
        Bid savedBid = bidRepository.save(bid);

        // Update highest bid
        updateHighestBid(bid.getCar().getId());
        return savedBid;
    }

    // Update highest bid for a car
    private void updateHighestBid(Long carId) {
        List<Bid> bids = bidRepository.findByCarIdOrderByAmountDesc(carId);

        // If there are bids for the car
        if (!bids.isEmpty()) {
            // Reset the highest bid flag for all bids
            bids.forEach(b -> {
                b.setIsHighestBid(false);
                bidRepository.save(b);
            });

            // Set the highest bid flag for the highest bid
            Bid highestBid = bids.get(0);
            highestBid.setIsHighestBid(true);
            bidRepository.save(highestBid);
        }
    }

    // Get the highest bid for a car
    public Bid getHighestBidForCar(Long carId) {
        return bidRepository.findByCarIdOrderByAmountDesc(carId).stream()
                .findFirst()
                .orElse(null);
    }

        // Get bids by car ID
    public List<Bid> getBidsByCarId(Long carId) {
        return bidRepository.findByCarIdOrderByAmountDesc(carId);
    }
}