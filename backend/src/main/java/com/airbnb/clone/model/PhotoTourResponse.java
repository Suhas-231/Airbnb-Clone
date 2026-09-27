package com.airbnb.clone.model;

import java.util.List;

public record PhotoTourResponse(
    int totalPhotos,
    List<PhotoCategory> categories,
    List<PhotoItem> allPhotos
) {}
