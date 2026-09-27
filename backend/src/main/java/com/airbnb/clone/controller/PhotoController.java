package com.airbnb.clone.controller;

import com.airbnb.clone.model.PhotoItem;
import com.airbnb.clone.model.PhotoTourResponse;
import com.airbnb.clone.service.PhotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings/{listingId}/photos")
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping
    public ResponseEntity<PhotoTourResponse> getPhotoTour(@PathVariable String listingId) {
        return ResponseEntity.ok(photoService.getPhotoTour());
    }

    @GetMapping("/hero")
    public ResponseEntity<List<PhotoItem>> getHeroPhotos(@PathVariable String listingId) {
        return ResponseEntity.ok(photoService.getHeroPhotos());
    }

    @GetMapping("/{photoId}")
    public ResponseEntity<PhotoItem> getPhotoById(@PathVariable String listingId, @PathVariable int photoId) {
        PhotoItem photo = photoService.getPhotoById(photoId);
        if (photo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(photo);
    }
}
