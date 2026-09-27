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
class PhotoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testExact43PhotosAnd9Categories() throws Exception {
        mockMvc.perform(get("/api/listings/mirashya-ug10/photos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPhotos", is(43)))
                .andExpect(jsonPath("$.categories", hasSize(9)))
                .andExpect(jsonPath("$.allPhotos", hasSize(43)))
                // Verify categories & individual counts
                .andExpect(jsonPath("$.categories[0].id", is("living-room-1")))
                .andExpect(jsonPath("$.categories[0].photoCount", is(3)))
                .andExpect(jsonPath("$.categories[1].id", is("living-room-2")))
                .andExpect(jsonPath("$.categories[1].photoCount", is(7)))
                .andExpect(jsonPath("$.categories[2].id", is("kitchen")))
                .andExpect(jsonPath("$.categories[2].photoCount", is(2)))
                .andExpect(jsonPath("$.categories[3].id", is("bedroom")))
                .andExpect(jsonPath("$.categories[3].photoCount", is(6)))
                .andExpect(jsonPath("$.categories[4].id", is("bathroom")))
                .andExpect(jsonPath("$.categories[4].photoCount", is(1)))
                .andExpect(jsonPath("$.categories[5].id", is("gym")))
                .andExpect(jsonPath("$.categories[5].photoCount", is(5)))
                .andExpect(jsonPath("$.categories[6].id", is("exterior")))
                .andExpect(jsonPath("$.categories[6].photoCount", is(6)))
                .andExpect(jsonPath("$.categories[7].id", is("pool")))
                .andExpect(jsonPath("$.categories[7].photoCount", is(3)))
                .andExpect(jsonPath("$.categories[8].id", is("additional")))
                .andExpect(jsonPath("$.categories[8].photoCount", is(10)));
    }

    @Test
    void testExact5HeroPhotos() throws Exception {
        mockMvc.perform(get("/api/listings/mirashya-ug10/photos/hero"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].isHero", is(true)))
                .andExpect(jsonPath("$[4].isHero", is(true)));
    }

    @Test
    void testGetSinglePhoto() throws Exception {
        mockMvc.perform(get("/api/listings/mirashya-ug10/photos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.categoryTitle", is("Living room 1")));

        mockMvc.perform(get("/api/listings/mirashya-ug10/photos/99"))
                .andExpect(status().isNotFound());
    }
}
