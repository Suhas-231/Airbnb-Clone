package com.airbnb.clone.model;

public record Review(
    String id,
    String authorName,
    String authorTenure,
    String authorAvatar,
    int rating,
    String date,
    String content
) {}
