package com.airbnb.clone.service;

import com.airbnb.clone.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ListingService {

    private final PhotoService photoService;
    private final ReviewService reviewService;
    private final Listing listing;
    private final List<NearbyStay> nearbyStays;

    public ListingService(PhotoService photoService, ReviewService reviewService) {
        this.photoService = photoService;
        this.reviewService = reviewService;

        // Amenities - Verified 50 items matching reference video dialog
        List<Amenity> highlights = new ArrayList<>();
        highlights.add(new Amenity("am-1", "Kitchen", "Kitchen and dining", "utensils", true, false));
        highlights.add(new Amenity("am-2", "Wifi", "Internet and office", "wifi", true, false));
        highlights.add(new Amenity("am-3", "Dedicated workspace", "Internet and office", "laptop", true, false));
        highlights.add(new Amenity("am-4", "Free parking on premises", "Parking and facilities", "car", true, false));
        highlights.add(new Amenity("am-5", "Pool", "Parking and facilities", "waves-horizontal", true, false));
        highlights.add(new Amenity("am-6", "Hot tub", "Parking and facilities", "bath", true, false));
        highlights.add(new Amenity("am-7", "Pets allowed", "Services", "paw-print", true, false));
        highlights.add(new Amenity("am-8", "Exterior security cameras on property", "Home safety", "camera", true, false));
        highlights.add(new Amenity("am-9", "Carbon monoxide alarm", "Home safety", "bell-off", true, true));
        highlights.add(new Amenity("am-10", "Smoke alarm", "Home safety", "bell-off", true, true));

        List<Amenity> allAmenities = new ArrayList<>(highlights);
        // Bathroom (5 items)
        allAmenities.add(new Amenity("am-11", "Hairdryer", "Bathroom", "wind", false, false));
        allAmenities.add(new Amenity("am-12", "Cleaning products", "Bathroom", "sparkles", false, false));
        allAmenities.add(new Amenity("am-13", "Shampoo", "Bathroom", "droplets", false, false));
        allAmenities.add(new Amenity("am-14", "Hot water", "Bathroom", "flame", false, false));
        allAmenities.add(new Amenity("am-15", "Shower gel", "Bathroom", "droplets", false, false));
        allAmenities.add(new Amenity("am-16", "Conditioner", "Bathroom", "droplets", false, false));
        allAmenities.add(new Amenity("am-17", "Body soap", "Bathroom", "droplets", false, false));

        // Bedroom and laundry (9 items)
        allAmenities.add(new Amenity("am-18", "Washing machine", "Bedroom and laundry", "disc", false, false));
        allAmenities.add(new Amenity("am-19", "Hangers", "Bedroom and laundry", "shirt", false, false));
        allAmenities.add(new Amenity("am-20", "Bed linen", "Bedroom and laundry", "bed", false, false));
        allAmenities.add(new Amenity("am-21", "Room-darkening blinds", "Bedroom and laundry", "sun", false, false));
        allAmenities.add(new Amenity("am-22", "Iron", "Bedroom and laundry", "shirt", false, false));
        allAmenities.add(new Amenity("am-23", "Clothes storage", "Bedroom and laundry", "box", false, false));
        allAmenities.add(new Amenity("am-24", "Extra pillows and blankets", "Bedroom and laundry", "bed", false, false));
        allAmenities.add(new Amenity("am-25", "Drying rack for clothing", "Bedroom and laundry", "shirt", false, false));
        allAmenities.add(new Amenity("am-26", "Mosquito net", "Bedroom and laundry", "shield", false, false));

        // Heating and cooling (2 items)
        allAmenities.add(new Amenity("am-27", "Air conditioning", "Heating and cooling", "wind", false, false));
        allAmenities.add(new Amenity("am-28", "Ceiling fan", "Heating and cooling", "fan", false, false));

        // Home safety (3 items)
        allAmenities.add(new Amenity("am-29", "Fire extinguisher", "Home safety", "flame", false, false));
        allAmenities.add(new Amenity("am-30", "First aid kit", "Home safety", "cross", false, false));

        // Kitchen and dining (12 items)
        allAmenities.add(new Amenity("am-31", "Refrigerator", "Kitchen and dining", "refrigerator", false, false));
        allAmenities.add(new Amenity("am-32", "Microwave", "Kitchen and dining", "microwave", false, false));
        allAmenities.add(new Amenity("am-33", "Cooking basics", "Kitchen and dining", "utensils", false, false));
        allAmenities.add(new Amenity("am-34", "Dishes and silverware", "Kitchen and dining", "utensils-crossed", false, false));
        allAmenities.add(new Amenity("am-35", "Freezer", "Kitchen and dining", "snowflake", false, false));
        allAmenities.add(new Amenity("am-36", "Kettle", "Kitchen and dining", "coffee", false, false));
        allAmenities.add(new Amenity("am-37", "Wine glasses", "Kitchen and dining", "wine", false, false));
        allAmenities.add(new Amenity("am-38", "Toaster", "Kitchen and dining", "microwave", false, false));
        allAmenities.add(new Amenity("am-39", "Dining table", "Kitchen and dining", "utensils", false, false));
        allAmenities.add(new Amenity("am-40", "Blender", "Kitchen and dining", "coffee", false, false));
        allAmenities.add(new Amenity("am-41", "Cooker", "Kitchen and dining", "flame", false, false));

        // Location features (1 item)
        allAmenities.add(new Amenity("am-42", "Private entrance", "Location features", "door-open", false, false));

        // Outdoor (4 items)
        allAmenities.add(new Amenity("am-43", "Patio or balcony", "Outdoor", "sun", false, false));
        allAmenities.add(new Amenity("am-44", "Garden", "Outdoor", "tree", false, false));
        allAmenities.add(new Amenity("am-45", "Outdoor furniture", "Outdoor", "armchair", false, false));
        allAmenities.add(new Amenity("am-46", "Outdoor dining area", "Outdoor", "utensils", false, false));

        // Parking and facilities (2 items)
        allAmenities.add(new Amenity("am-47", "Shared gym in building", "Parking and facilities", "dumbbell", false, false));
        allAmenities.add(new Amenity("am-48", "Lift", "Parking and facilities", "arrow-up-down", false, false));

        // Services (2 items)
        allAmenities.add(new Amenity("am-49", "Building staff", "Services", "users", false, false));
        allAmenities.add(new Amenity("am-50", "Long-term stays allowed", "Services", "calendar", false, false));

        // Host
        List<String> coHosts = List.of(
                "Sharath", "Aman Dev Pahwa", "Maria Karen Priyanka",
                "Simran", "Pallavi", "Sanyukta", "Shruti", "Amisha"
        );
        Host host = new Host(
                "Mirashya Homes",
                "/images/avatars/host_logo.png",
                "2 years hosting",
                4.68,
                1463,
                true,
                "100%",
                "Responds within an hour",
                coHosts,
                "Mirashya Homes is a premier hospitality provider delivering curated luxury stays across North Goa."
        );

        // House rules and safety
        List<String> houseRules = List.of(
                "Check-in after 2:00 pm",
                "Checkout before 11:00 am",
                "3 guests maximum"
        );
        List<String> safetyFeatures = List.of(
                "Carbon monoxide alarm not reported",
                "Smoke alarm not reported",
                "Exterior security cameras on property"
        );

        this.listing = new Listing(
                "mirashya-ug10",
                "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
                "Entire serviced apartment in Candolim, India",
                "Candolim, Goa, India",
                3,
                1,
                1,
                1,
                5700,
                1200,
                3900,
                host,
                reviewService.getRatingBreakdown(),
                photoService.getHeroPhotos(),
                photoService.getAllPhotos().size(),
                highlights,
                allAmenities,
                "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's the ultimate getaway spot for your Goa trip!",
                "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.",
                "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
                houseRules,
                safetyFeatures
        );

        // Nearby stays - 8 exact properties matching video pagination pages 1 & 2
        List<NearbyStay> stays = new ArrayList<>();
        stays.add(new NearbyStay("stay-1", "Beautiful Studio with a view to die for",
                "/images/nearby/nearby_1_studio.jpg",
                23600, 4.91, "Candolim"));
        stays.add(new NearbyStay("stay-2", "NAQAB - 1bhk with private pool",
                "/images/nearby/nearby_2_naqab.jpg",
                42218, 4.95, "Candolim"));
        stays.add(new NearbyStay("stay-3", "Greentique Luxury Flat with plunge pool, Calangute",
                "/images/nearby/nearby_3_greentique.jpg",
                44506, 4.94, "Calangute"));
        stays.add(new NearbyStay("stay-4", "The Tropical Studio | 5 mins to Beach",
                "/images/nearby/nearby_4_tropical.jpg",
                22824, 4.96, "Candolim"));
        stays.add(new NearbyStay("stay-5", "Luxury Casa Bella 1BHK with plunge pool, Calangute",
                "/images/nearby/nearby_5_casabella.jpg",
                39942, 4.95, "Calangute"));
        stays.add(new NearbyStay("stay-6", "Kanso by Earthen Window | Jacuzzi | Terrace | Pool",
                "/images/nearby/nearby_6_kanso.jpg",
                45648, 5.0, "Candolim"));
        stays.add(new NearbyStay("stay-7", "Luxury Apt | Private Pool | 6 Mins from Beach",
                "/images/nearby/nearby_7_luxury_apt.jpg",
                48786, 4.93, "Candolim"));
        stays.add(new NearbyStay("stay-8", "Serendipity Cottage - Calm Stay in Calangute-Baga.",
                "/images/nearby/nearby_8_serendipity.jpg",
                22824, 4.92, "Calangute"));

        this.nearbyStays = List.copyOf(stays);
    }

    public Listing getListing() {
        return listing;
    }

    public List<NearbyStay> getNearbyStays() {
        return nearbyStays;
    }
}
