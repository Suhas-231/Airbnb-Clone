package com.airbnb.clone;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ReservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testStandardFiveNightQuote() throws Exception {
        String json = """
                {
                    "checkInDate": "2026-10-18",
                    "checkOutDate": "2026-10-23",
                    "guests": 2,
                    "hasDiscountClaimed": false
                }
                """;

        mockMvc.perform(post("/api/reservations/quote")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nights", is(5)))
                .andExpect(jsonPath("$.basePricePerNight", is(5700)))
                .andExpect(jsonPath("$.accommodationTotal", is(28499)))
                .andExpect(jsonPath("$.discountAmount", is(0)))
                .andExpect(jsonPath("$.cleaningFee", is(1200)))
                .andExpect(jsonPath("$.serviceFee", is(3900)))
                .andExpect(jsonPath("$.totalPrice", is(33599)))
                .andExpect(jsonPath("$.cancellationDeadline", is("17 October")));
    }

    @Test
    void testQuoteWithDiscountClaimed() throws Exception {
        String json = """
                {
                    "checkInDate": "2026-10-18",
                    "checkOutDate": "2026-10-23",
                    "guests": 2,
                    "hasDiscountClaimed": true
                }
                """;

        mockMvc.perform(post("/api/reservations/quote")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nights", is(5)))
                .andExpect(jsonPath("$.discountAmount", is(2849)))
                .andExpect(jsonPath("$.totalPrice", is(33599 - 2849)));
    }

    @Test
    void testCreateReservation() throws Exception {
        String json = """
                {
                    "listingId": "mirashya-ug10",
                    "guestName": "Test Guest",
                    "guestEmail": "guest@example.com",
                    "checkInDate": "2026-10-18",
                    "checkOutDate": "2026-10-23",
                    "guests": 2,
                    "totalPrice": 33599
                }
                """;

        mockMvc.perform(post("/api/reservations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.reservationId", startsWith("RES-")))
                .andExpect(jsonPath("$.status", is("CONFIRMED")))
                .andExpect(jsonPath("$.guests", is(2)))
                .andExpect(jsonPath("$.totalPaid", is(33599)));
    }
}
