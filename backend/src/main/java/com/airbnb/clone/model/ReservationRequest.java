package com.airbnb.clone.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record ReservationRequest(
    @NotBlank String listingId,
    @NotBlank String guestName,
    @Email String guestEmail,
    @NotBlank String checkInDate,
    @NotBlank String checkOutDate,
    @Min(1) int guests,
    int totalPrice
) {}
