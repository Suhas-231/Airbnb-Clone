export interface PhotoItem {
  id: number;
  url: string;
  title: string;
  categoryId: string;
  categoryTitle: string;
  orderInCategory: number;
  isHero: boolean;
}

export interface PhotoCategory {
  id: string;
  title: string;
  tags: string;
  coverPhotoUrl: string;
  photoCount: number;
  photos: PhotoItem[];
}

export interface PhotoTourResponse {
  totalPhotos: number;
  categories: PhotoCategory[];
  allPhotos: PhotoItem[];
}

export interface RatingBreakdown {
  overall: number;
  totalReviews: number;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  starDistribution: Record<string, number>;
  tags: Record<string, number>;
}

export interface Review {
  id: string;
  authorName: string;
  authorTenure: string;
  authorAvatar: string;
  rating: number;
  date: string;
  content: string;
}

export interface ReviewResponse {
  ratingBreakdown: RatingBreakdown;
  reviews: Review[];
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  icon: string;
  isHighlight: boolean;
  isNotIncluded: boolean;
}

export interface Host {
  name: string;
  avatar: string;
  tenure: string;
  rating: number;
  reviewsCount: number;
  isSuperhost: boolean;
  responseRate: string;
  responseTime: string;
  coHosts: string[];
  bio: string;
  yearsHosting?: number;
}

export interface NearbyStay {
  id: string;
  title: string;
  imageUrl: string;
  pricePerNight: number;
  rating: number;
  distance: string;
}

export interface Listing {
  id: string;
  title: string;
  propertyType: string;
  locationName: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  host: Host;
  rating: RatingBreakdown;
  heroPhotos: PhotoItem[];
  totalPhotos: number;
  highlights: Amenity[];
  allAmenities: Amenity[];
  description: string;
  locationDescription: string;
  cancellationPolicy: string;
  houseRules: string[];
  safetyFeatures: string[];
}

export interface ReservationQuoteRequest {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  hasDiscountClaimed: boolean;
}

export interface ReservationQuoteResponse {
  nights: number;
  basePricePerNight: number;
  accommodationTotal: number;
  discountAmount: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
  currency: string;
  cancellationDeadline: string;
}
