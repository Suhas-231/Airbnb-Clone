package com.airbnb.clone.service;

import com.airbnb.clone.model.RatingBreakdown;
import com.airbnb.clone.model.Review;
import com.airbnb.clone.model.ReviewResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    private final RatingBreakdown ratingBreakdown;
    private final List<Review> reviews;

    public ReviewService() {
        Map<Integer, Integer> starDist = new LinkedHashMap<>();
        starDist.put(5, 92);
        starDist.put(4, 8);
        starDist.put(3, 0);
        starDist.put(2, 0);
        starDist.put(1, 0);

        Map<String, Integer> tags = new LinkedHashMap<>();
        tags.put("Comfort", 6);
        tags.put("Accuracy", 5);
        tags.put("Hot tub", 5);
        tags.put("Condition", 4);
        tags.put("Hospitality", 8);
        tags.put("Cleanliness", 4);
        tags.put("Amenities", 2);

        this.ratingBreakdown = new RatingBreakdown(
                4.95,
                19,
                5.0,
                5.0,
                5.0,
                5.0,
                4.8,
                4.8,
                starDist,
                tags
        );

        List<Review> revList = new ArrayList<>();
        revList.add(new Review("rev-1", "Amit", "2 months on Airbnb", "rgb(224, 138, 62)", 5, "1 week ago",
                "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property."));
        revList.add(new Review("rev-2", "Aheesh", "3 years on Airbnb", "/images/avatars/reviewer_aheesh.png", 5, "2 weeks ago",
                "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely..."));
        revList.add(new Review("rev-3", "Samiksha", "8 months on Airbnb", "/images/avatars/reviewer_samiksha.png", 5, "May 2026",
                "the host nitish was really great help"));
        revList.add(new Review("rev-4", "Vedant", "4 years on Airbnb", "rgb(155, 109, 224)", 5, "May 2026",
                "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanline..."));
        revList.add(new Review("rev-5", "Vaibhav S", "3 years on Airbnb", "rgb(224, 67, 62)", 5, "May 2026",
                "Great great experience living out there, can't expect more, will always look for it in the future and will recommend my friends too."));
        revList.add(new Review("rev-6", "Mohd", "5 years on Airbnb", "rgb(62, 224, 199)", 5, "May 2026",
                "Great place. Exactly as described in the listing."));
        revList.add(new Review("rev-7", "Karan", "2 years on Airbnb", "#D97706", 5, "March 2026",
                "Fantastic stay for couples. The rooftop pool offers gorgeous sunset views. Candolim market is a 5-minute walk."));
        revList.add(new Review("rev-8", "Ananya", "6 months on Airbnb", "#0284C7", 5, "March 2026",
                "One of the best Airbnb experiences we have had in Goa. Very safe and guarded society with ample car parking."));
        revList.add(new Review("rev-9", "David", "7 years on Airbnb", "#4F46E5", 5, "February 2026",
                "Wonderful apartment! The double height living room makes the space feel luxurious. Fast internet allowed me to take calls smoothly."));
        revList.add(new Review("rev-10", "Sarah", "3 years on Airbnb", "#BE123C", 5, "February 2026",
                "We loved every minute here! The jacuzzi was hot and spotless, and the bed was very comfortable. Highly recommend!"));
        revList.add(new Review("rev-11", "Rohan", "2 years on Airbnb", "#059669", 5, "January 2026",
                "Very hospitable team. Communication via WhatsApp was instantaneous. Will definitely rebook next time I am in Candolim."));
        revList.add(new Review("rev-12", "Neha", "4 years on Airbnb", "#C026D3", 5, "January 2026",
                "Everything from check-in to check-out was seamless. Great dining options right outside on the main road."));
        revList.add(new Review("rev-13", "Vikram", "5 years on Airbnb", "#475569", 4, "December 2025",
                "Pleasant stay overall. Jacuzzi is wonderful. The road outside can have slight traffic during peak evening hours, but inside is very quiet."));
        revList.add(new Review("rev-14", "Sneha", "1 year on Airbnb", "#E11D48", 5, "December 2025",
                "A true gem in Candolim! Loved the modern aesthetic and ambient lighting throughout the apartment."));
        revList.add(new Review("rev-15", "Aditya", "3 years on Airbnb", "#2563EB", 5, "November 2025",
                "Felt like a home away from home. The kitchen had all necessary cookware, microwave, and kettle."));
        revList.add(new Review("rev-16", "Pooja", "2 years on Airbnb", "#D97706", 5, "November 2025",
                "Mirashya Homes hospitality was second to none. Very clean bathroom with ample hot water and fresh towels."));
        revList.add(new Review("rev-17", "Manish", "6 years on Airbnb", "#0D9488", 5, "October 2025",
                "Superhost experience through and through. The gym in the building is well-maintained and never crowded."));
        revList.add(new Review("rev-18", "Ritu", "8 months on Airbnb", "#9333EA", 4, "October 2025",
                "Very romantic apartment for a getaway. Jacuzzi was relaxing and the building staff were very courteous."));
        revList.add(new Review("rev-19", "Sanjay", "4 years on Airbnb", "#16A34A", 5, "September 2025",
                "Superb apartment in North Goa. Excellent location close to beaches and top restaurants. Highly recommended!"));

        this.reviews = Collections.unmodifiableList(revList);
    }

    public RatingBreakdown getRatingBreakdown() {
        return ratingBreakdown;
    }

    public List<Review> getAllReviews() {
        return reviews;
    }

    public ReviewResponse getReviewResponse() {
        return new ReviewResponse(ratingBreakdown, reviews);
    }
}
