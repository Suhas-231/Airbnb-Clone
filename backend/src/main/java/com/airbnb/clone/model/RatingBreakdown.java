package com.airbnb.clone.model;

import java.util.Map;

public record RatingBreakdown(
    double overall,
    int totalReviews,
    double cleanliness,
    double accuracy,
    double checkIn,
    double communication,
    double location,
    double value,
    Map<Integer, Integer> starDistribution,
    Map<String, Integer> tags
) {}
