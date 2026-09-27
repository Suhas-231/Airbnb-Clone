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
class ListingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetListingDetails() throws Exception {
        mockMvc.perform(get("/api/listings/mirashya-ug10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is("mirashya-ug10")))
                .andExpect(jsonPath("$.title", is("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10")))
                .andExpect(jsonPath("$.totalPhotos", is(43)))
                .andExpect(jsonPath("$.heroPhotos", hasSize(5)))
                .andExpect(jsonPath("$.maxGuests", is(3)))
                .andExpect(jsonPath("$.host.name", is("Mirashya Homes")))
                .andExpect(jsonPath("$.rating.overall", is(4.95)))
                .andExpect(jsonPath("$.rating.totalReviews", is(19)));
    }

    @Test
    void testGetNearbyStays() throws Exception {
        mockMvc.perform(get("/api/listings/nearby"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(4))))
                .andExpect(jsonPath("$[0].title", notNullValue()));
    }
}
