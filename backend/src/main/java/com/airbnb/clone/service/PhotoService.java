package com.airbnb.clone.service;

import com.airbnb.clone.model.PhotoCategory;
import com.airbnb.clone.model.PhotoItem;
import com.airbnb.clone.model.PhotoTourResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class PhotoService {

    private final List<PhotoItem> allPhotos;
    private final List<PhotoCategory> categories;

    public PhotoService() {
        List<PhotoItem> photos = new ArrayList<>();

        // 1. Living room 1 (3 photos)
        photos.add(new PhotoItem(1, "/images/tour/photo_01.jpg",
                "Warm living room with sofa, oriental rug and coffee table", "living-room-1", "Living room 1", 1, false));
        photos.add(new PhotoItem(2, "/images/tour/photo_02.jpg",
                "Bright living room with dining area and TV", "living-room-1", "Living room 1", 2, false));
        photos.add(new PhotoItem(3, "/images/tour/photo_03.jpg",
                "Living room perspective with dining table and kitchen", "living-room-1", "Living room 1", 3, false));

        // 2. Living room 2 (7 photos)
        photos.add(new PhotoItem(5, "/images/tour/photo_04.jpg",
                "Outdoor covered patio lounge with wicker furniture and wall sconces", "living-room-2", "Living room 2", 1, true));
        photos.add(new PhotoItem(6, "/images/tour/photo_05.jpg",
                "Private jacuzzi hot tub set in wooden deck", "living-room-2", "Living room 2", 2, true));
        photos.add(new PhotoItem(7, "/images/tour/photo_06.jpg",
                "High ceiling atrium seating area", "living-room-2", "Living room 2", 3, false));
        photos.add(new PhotoItem(8, "/images/tour/photo_07.jpg",
                "Patio seating angle overlooking the private jacuzzi", "living-room-2", "Living room 2", 4, true));
        photos.add(new PhotoItem(9, "/images/tour/photo_08.jpg",
                "Atrium perspective showing wooden jacuzzi platform and stairs", "living-room-2", "Living room 2", 5, false));
        photos.add(new PhotoItem(10, "/images/tour/photo_09.jpg",
                "Spacious patio atrium dining and lounge area", "living-room-2", "Living room 2", 6, false));
        photos.add(new PhotoItem(11, "/images/tour/photo_10.jpg",
                "Atrium lounge with bench seating and tropical plants", "living-room-2", "Living room 2", 7, false));

        // 3. Full kitchen (2 photos)
        photos.add(new PhotoItem(12, "/images/tour/photo_11.jpg",
                "Fully equipped modular kitchen with wooden cabinets and countertop", "kitchen", "Full kitchen", 1, false));
        photos.add(new PhotoItem(13, "/images/tour/photo_12.jpg",
                "Kitchen preparation counter with induction cooker and dining area", "kitchen", "Full kitchen", 2, false));

        // 4. Bedroom (6 photos)
        photos.add(new PhotoItem(14, "/images/tour/photo_13.jpg",
                "Comfortable bedroom with double bed, wooden floors and window curtains", "bedroom", "Bedroom", 1, true));
        photos.add(new PhotoItem(15, "/images/tour/photo_14.jpg",
                "Bedroom entryway with full-length mirror and wardrobe", "bedroom", "Bedroom", 2, false));
        photos.add(new PhotoItem(16, "/images/tour/photo_15.jpg",
                "Bedroom perspective showing ambient lighting and air conditioning", "bedroom", "Bedroom", 3, false));
        photos.add(new PhotoItem(17, "/images/tour/photo_16.jpg",
                "Bright bedroom with double bed and window", "bedroom", "Bedroom", 4, false));
        photos.add(new PhotoItem(18, "/images/tour/photo_17.jpg",
                "Wardrobe storage and dressing area in bedroom", "bedroom", "Bedroom", 5, false));
        photos.add(new PhotoItem(19, "/images/tour/photo_18.jpg",
                "Double bed facing perspective with bedside tables", "bedroom", "Bedroom", 6, false));

        // 5. Full bathroom (1 photo)
        photos.add(new PhotoItem(20, "/images/tour/photo_19.jpg",
                "Modern bathroom with circular mirror, vanity and glass shower enclosure", "bathroom", "Full bathroom", 1, false));

        // 6. Gym (5 photos)
        photos.add(new PhotoItem(21, "/images/tour/photo_20.jpg",
                "Cardio equipment and dumbbell rack in society fitness center", "gym", "Gym", 1, false));
        photos.add(new PhotoItem(22, "/images/tour/photo_21.jpg",
                "Multi-gym equipment and fitness ball in building gym", "gym", "Gym", 2, false));
        photos.add(new PhotoItem(23, "/images/tour/photo_22.jpg",
                "Wide angle view of modern building gym", "gym", "Gym", 3, false));
        photos.add(new PhotoItem(24, "/images/tour/photo_23.jpg",
                "Fitness room interior with exercise machines", "gym", "Gym", 4, false));
        photos.add(new PhotoItem(25, "/images/tour/photo_24.jpg",
                "Sunlit fitness center with workout equipment", "gym", "Gym", 5, false));

        // 7. Exterior (6 photos)
        photos.add(new PhotoItem(26, "/images/tour/photo_25.jpg",
                "Aerial drone view of Amor de Goa complex", "exterior", "Exterior", 1, false));
        photos.add(new PhotoItem(27, "/images/tour/photo_26.jpg",
                "High altitude drone view showing lush green surroundings and sea horizon", "exterior", "Exterior", 2, false));
        photos.add(new PhotoItem(28, "/images/tour/photo_27.jpg",
                "Amor de Goa building exterior facade and entrance road", "exterior", "Exterior", 3, false));
        photos.add(new PhotoItem(29, "/images/tour/photo_28.jpg",
                "Amor de Goa complex architecture and balconies", "exterior", "Exterior", 4, false));
        photos.add(new PhotoItem(30, "/images/tour/photo_29.jpg",
                "Aerial angle of building rooftop and surrounding villas", "exterior", "Exterior", 5, false));
        photos.add(new PhotoItem(31, "/images/tour/photo_43.jpg",
                "Amor de Goa building exterior facade", "exterior", "Exterior", 6, true));

        // 8. Pool (3 photos)
        photos.add(new PhotoItem(32, "/images/tour/photo_30.jpg",
                "Central courtyard swimming pool surrounded by balconies", "pool", "Pool", 1, false));
        photos.add(new PhotoItem(33, "/images/tour/photo_31.jpg",
                "Sparkling swimming pool with wooden sun deck", "pool", "Pool", 2, false));
        photos.add(new PhotoItem(34, "/images/tour/photo_32.jpg",
                "Courtyard pool view looking towards the residential building", "pool", "Pool", 3, false));

        // 9. Additional photos (10 photos)
        photos.add(new PhotoItem(35, "/images/tour/photo_33.jpg",
                "Covered patio corner with warm lighting sconces", "additional", "Additional photos", 1, false));
        photos.add(new PhotoItem(36, "/images/tour/photo_34.jpg",
                "Elevated perspective from jacuzzi overlooking patio lounge", "additional", "Additional photos", 2, false));
        photos.add(new PhotoItem(37, "/images/tour/photo_35.jpg",
                "Patio seating next to wooden jacuzzi deck", "additional", "Additional photos", 3, false));
        photos.add(new PhotoItem(38, "/images/tour/photo_36.jpg",
                "Utility counter with washing machine and kitchen sink", "additional", "Additional photos", 4, false));
        photos.add(new PhotoItem(39, "/images/tour/photo_37.jpg",
                "Evening ambient lighting in covered patio lounge", "additional", "Additional photos", 5, false));
        photos.add(new PhotoItem(40, "/images/tour/photo_38.jpg",
                "Atrium view with dining table and jacuzzi in background", "additional", "Additional photos", 6, false));
        photos.add(new PhotoItem(41, "/images/tour/photo_39.jpg",
                "Utility washing area with framed artwork", "additional", "Additional photos", 7, false));
        photos.add(new PhotoItem(42, "/images/tour/photo_40.jpg",
                "Double-height open atrium with glass dining table", "additional", "Additional photos", 8, false));
        photos.add(new PhotoItem(43, "/images/tour/photo_41.jpg",
                "Artistic wooden decorative pieces mounted in atrium", "additional", "Additional photos", 9, false));
        photos.add(new PhotoItem(44, "/images/tour/photo_42.jpg",
                "Living room panoramic view", "additional", "Additional photos", 10, false));

        this.allPhotos = Collections.unmodifiableList(photos);

        // Group into exact 9 categories matching reference
        List<PhotoCategory> catList = new ArrayList<>();
        catList.add(new PhotoCategory("living-room-1", "Living room 1", "Sofa \u00B7 Air conditioning \u00B7 Ceiling fan \u00B7 TV",
                photos.get(0).url(), 3, filterByCategory(photos, "living-room-1")));
        catList.add(new PhotoCategory("living-room-2", "Living room 2", "Ceiling fan \u00B7 Hot tub",
                photos.get(3).url(), 7, filterByCategory(photos, "living-room-2")));
        catList.add(new PhotoCategory("kitchen", "Full kitchen", "Freezer \u00B7 Fridge \u00B7 Blender \u00B7 Cooker \u00B7 Cooking basics \u00B7 Kettle \u00B7 Microwave \u00B7 Toaster \u00B7 Wine glasses \u00B7 Coffee \u00B7 Crockery and cutlery",
                photos.get(10).url(), 2, filterByCategory(photos, "kitchen")));
        catList.add(new PhotoCategory("bedroom", "Bedroom", "Double bed \u00B7 Air conditioning \u00B7 Bed linen \u00B7 Ceiling fan \u00B7 Clothes storage \u00B7 Cot \u00B7 Hangers \u00B7 Iron \u00B7 Room-darkening blinds \u00B7 Cleaning available during stay \u00B7 Cleaning products \u00B7 Long-term stays allowed \u00B7 Private entrance \u00B7 Wifi",
                photos.get(12).url(), 6, filterByCategory(photos, "bedroom")));
        catList.add(new PhotoCategory("bathroom", "Full bathroom", "Hairdryer \u00B7 Hot water \u00B7 Shampoo \u00B7 Shower gel",
                photos.get(18).url(), 1, filterByCategory(photos, "bathroom")));
        catList.add(new PhotoCategory("gym", "Gym", "Air conditioning \u00B7 Gym \u00B7 Exercise equipment \u00B7 Ceiling fan",
                photos.get(19).url(), 5, filterByCategory(photos, "gym")));
        catList.add(new PhotoCategory("exterior", "Exterior", "",
                photos.get(24).url(), 6, filterByCategory(photos, "exterior")));
        catList.add(new PhotoCategory("pool", "Pool", "Pool",
                photos.get(30).url(), 3, filterByCategory(photos, "pool")));
        catList.add(new PhotoCategory("additional", "Additional photos", "",
                photos.get(33).url(), 10, filterByCategory(photos, "additional")));

        this.categories = Collections.unmodifiableList(catList);
    }

    private List<PhotoItem> filterByCategory(List<PhotoItem> list, String categoryId) {
        return list.stream().filter(p -> p.categoryId().equals(categoryId)).toList();
    }

    public List<PhotoItem> getAllPhotos() {
        return allPhotos;
    }

    public List<PhotoItem> getHeroPhotos() {
        return List.of(
                getPhotoById(5),   // photo_04.jpg - covered patio lounge (large left)
                getPhotoById(8),   // photo_07.jpg - patio seating angle (top center)
                getPhotoById(6),   // photo_05.jpg - private jacuzzi (top right)
                getPhotoById(14),  // photo_13.jpg - bedroom (bottom center)
                getPhotoById(31)   // photo_43.jpg - Amor de Goa building exterior (bottom right)
        );
    }

    public List<PhotoCategory> getCategories() {
        return categories;
    }

    public PhotoTourResponse getPhotoTour() {
        return new PhotoTourResponse(allPhotos.size(), categories, allPhotos);
    }

    public PhotoItem getPhotoById(int id) {
        return allPhotos.stream().filter(p -> p.id() == id).findFirst().orElse(null);
    }
}
