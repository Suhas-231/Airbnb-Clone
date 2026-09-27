package com.airbnb.clone.model;

public record NearbyStay(
    String id,
    String title,
    String imageUrl,
    int pricePerNight,
    double rating,
    String distance
) {}
