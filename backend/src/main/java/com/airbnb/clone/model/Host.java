package com.airbnb.clone.model;

import java.util.List;

public record Host(
    String name,
    String avatar,
    String tenure,
    double rating,
    int reviewsCount,
    boolean isSuperhost,
    String responseRate,
    String responseTime,
    List<String> coHosts,
    String bio
) {}
