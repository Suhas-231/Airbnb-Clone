package com.airbnb.clone.controller;

import com.airbnb.clone.model.ReviewResponse;
import com.airbnb.clone.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/listings/{listingId}/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<ReviewResponse> getReviews(@PathVariable String listingId) {
        return ResponseEntity.ok(reviewService.getReviewResponse());
    }
}
