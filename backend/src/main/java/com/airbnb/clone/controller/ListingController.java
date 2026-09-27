package com.airbnb.clone.controller;

import com.airbnb.clone.model.Listing;
import com.airbnb.clone.model.NearbyStay;
import com.airbnb.clone.service.ListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable String id) {
        Listing listing = listingService.getListing();
        return ResponseEntity.ok(listing);
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<NearbyStay>> getNearbyStays() {
        return ResponseEntity.ok(listingService.getNearbyStays());
    }
}
