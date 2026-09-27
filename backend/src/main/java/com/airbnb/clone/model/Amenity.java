package com.airbnb.clone.model;

public record Amenity(
    String id,
    String name,
    String category,
    String icon,
    boolean isHighlight,
    boolean isNotIncluded
) {}
