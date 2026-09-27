package com.airbnb.clone.model;

import java.util.List;

public record PhotoCategory(
    String id,
    String title,
    String tags,
    String coverPhotoUrl,
    int photoCount,
    List<PhotoItem> photos
) {}
