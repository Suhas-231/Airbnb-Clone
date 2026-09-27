package com.airbnb.clone.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record ReservationQuoteRequest(
    @NotBlank String checkInDate,
    @NotBlank String checkOutDate,
    @Min(1) int guests,
    boolean hasDiscountClaimed
) {}
