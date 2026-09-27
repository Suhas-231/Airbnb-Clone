package com.airbnb.clone.model;

public record ReservationQuoteResponse(
    int nights,
    int basePricePerNight,
    int accommodationTotal,
    int discountAmount,
    int cleaningFee,
    int serviceFee,
    int totalPrice,
    String currency,
    String cancellationDeadline
) {}
