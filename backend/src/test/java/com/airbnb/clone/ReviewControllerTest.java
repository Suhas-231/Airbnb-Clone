package com.airbnb.clone;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetReviewsParity() throws Exception {
        mockMvc.perform(get("/api/listings/mirashya-ug10/reviews"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ratingBreakdown.overall", is(4.95)))
                .andExpect(jsonPath("$.ratingBreakdown.totalReviews", is(19)))
                .andExpect(jsonPath("$.ratingBreakdown.cleanliness", is(5.0)))
                .andExpect(jsonPath("$.ratingBreakdown.accuracy", is(5.0)))
                .andExpect(jsonPath("$.ratingBreakdown.checkIn", is(5.0)))
                .andExpect(jsonPath("$.ratingBreakdown.communication", is(5.0)))
                .andExpect(jsonPath("$.ratingBreakdown.location", is(4.8)))
                .andExpect(jsonPath("$.ratingBreakdown.value", is(4.8)))
                .andExpect(jsonPath("$.reviews", hasSize(19)))
                .andExpect(jsonPath("$.reviews[0].authorName", is("Amit")));
    }
}
