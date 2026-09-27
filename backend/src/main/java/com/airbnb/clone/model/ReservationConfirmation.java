package com.airbnb.clone.model;

public record ReservationConfirmation(
    String reservationId,
    String status,
    String listingTitle,
    String checkInDate,
    String checkOutDate,
    int guests,
    int totalPaid,
    String createdAt
) {}
