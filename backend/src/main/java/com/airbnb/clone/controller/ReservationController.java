package com.airbnb.clone.controller;

import com.airbnb.clone.model.ReservationConfirmation;
import com.airbnb.clone.model.ReservationQuoteRequest;
import com.airbnb.clone.model.ReservationQuoteResponse;
import com.airbnb.clone.model.ReservationRequest;
import com.airbnb.clone.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/quote")
    public ResponseEntity<ReservationQuoteResponse> getQuote(@Valid @RequestBody ReservationQuoteRequest request) {
        return ResponseEntity.ok(reservationService.calculateQuote(request));
    }

    @PostMapping
    public ResponseEntity<ReservationConfirmation> createReservation(@Valid @RequestBody ReservationRequest request) {
        return ResponseEntity.ok(reservationService.createReservation(request));
    }
}
