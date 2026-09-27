package com.airbnb.clone.model;

public record PhotoItem(
    int id,
    String url,
    String title,
    String categoryId,
    String categoryTitle,
    int orderInCategory,
    boolean isHero
) {}
