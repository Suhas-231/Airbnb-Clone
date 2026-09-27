package com.airbnb.clone.model;

import java.util.List;

public record Listing(
    String id,
    String title,
    String propertyType,
    String locationName,
    int maxGuests,
    int bedrooms,
    int beds,
    int bathrooms,
    int basePrice,
    int cleaningFee,
    int serviceFee,
    Host host,
    RatingBreakdown rating,
    List<PhotoItem> heroPhotos,
    int totalPhotos,
    List<Amenity> highlights,
    List<Amenity> allAmenities,
    String description,
    String locationDescription,
    String cancellationPolicy,
    List<String> houseRules,
    List<String> safetyFeatures
) {}
