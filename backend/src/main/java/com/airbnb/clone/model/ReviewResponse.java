package com.airbnb.clone.model;

import java.util.List;

public record ReviewResponse(
    RatingBreakdown ratingBreakdown,
    List<Review> reviews
) {}
