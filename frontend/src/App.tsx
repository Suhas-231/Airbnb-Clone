import { useEffect, useState, useRef } from 'react';
import { Navbar } from './components/layout/Navbar';
import { StickyNav } from './components/layout/StickyNav';
import { ListingHeader } from './components/sections/ListingHeader';
import { HeroGallery } from './components/gallery/HeroGallery';
import { OverviewSection } from './components/sections/OverviewSection';
import { SleepSection } from './components/sections/SleepSection';
import { AmenitiesSection } from './components/sections/AmenitiesSection';
import { AmenitiesModal } from './components/sections/AmenitiesModal';
import { CalendarSection } from './components/sections/CalendarSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { LocationSection } from './components/sections/LocationSection';
import { HostSection } from './components/sections/HostSection';
import { ThingsToKnowSection } from './components/sections/ThingsToKnowSection';
import { NearbyStaysCarousel } from './components/sections/NearbyStaysCarousel';
import { ReservationCard } from './components/reservation/ReservationCard';
import { PhotoTourModal } from './components/gallery/PhotoTourModal';
import { LightboxModal } from './components/gallery/LightboxModal';
import { api } from './api/client';
import { Listing, PhotoTourResponse, ReviewResponse } from './types/listing';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function App() {
  const [listing, setListing] = useState<Listing | null>(null);
  const [photoTour, setPhotoTour] = useState<PhotoTourResponse | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gallery & modal states
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [amenitiesModalOpen, setAmenitiesModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);

  // Calendar / reservation sync
  const [checkInDate, setCheckInDate] = useState('2026-10-18');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-23');
  const [nights, setNights] = useState(5);

  // Toast state for Reserve action
  const [showReserveToast, setShowReserveToast] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleReserve = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setShowReserveToast(true);
    toastTimeoutRef.current = setTimeout(() => {
      setShowReserveToast(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [listingData, photoData, reviewsRes] = await Promise.all([
        api.getListing('mirashya-ug10'),
        api.getPhotos('mirashya-ug10'),
        api.getReviews('mirashya-ug10'),
      ]);
      setListing(listingData);
      setPhotoTour(photoData);
      setReviewsData(reviewsRes);
    } catch (err: unknown) {
      console.error('Failed to load listing data:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to backend service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Sync ?modal=PHOTO_TOUR_SCROLLABLE query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('modal') === 'PHOTO_TOUR_SCROLLABLE') {
      setPhotoTourOpen(true);
    } else if (params.get('modal') === 'LIGHTBOX') {
      setPhotoTourOpen(true);
      setLightboxOpen(true);
    }

    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      if (p.get('modal') === 'PHOTO_TOUR_SCROLLABLE') {
        setPhotoTourOpen(true);
      } else {
        setPhotoTourOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // StickyNav scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 560) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (photoTourOpen || lightboxOpen || amenitiesModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [photoTourOpen, lightboxOpen, amenitiesModalOpen]);

  // Gallery handlers
  const handleOpenPhotoTour = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('modal', 'PHOTO_TOUR_SCROLLABLE');
      window.history.pushState({}, '', url.toString());
    } catch (e) {
      // Ignore if SSR or restricted
    }
    setPhotoTourOpen(true);
    setLightboxOpen(false);
  };

  const handleOpenLightbox = (heroIndex: number, photoId?: number) => {
    let targetIndex = heroIndex;
    if (photoId && photoTour?.allPhotos) {
      const idx = photoTour.allPhotos.findIndex((p) => p.id === photoId);
      if (idx !== -1) targetIndex = idx;
    }
    setSelectedPhotoIndex(targetIndex);
    setPhotoTourOpen(true);
    setLightboxOpen(true);
  };

  const handleSelectPhotoInTour = (globalIndex: number) => {
    setSelectedPhotoIndex(globalIndex);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handleClosePhotoTour = () => {
    setLightboxOpen(false);
    setPhotoTourOpen(false);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('modal');
      window.history.pushState({}, '', url.toString());
    } catch (e) {
      // Ignore
    }
  };

  const handleNavigateLightbox = (newIndex: number) => {
    setSelectedPhotoIndex(newIndex);
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  const handleDateChange = (inDate: string, outDate: string, n: number) => {
    setCheckInDate(inDate);
    setCheckOutDate(outDate);
    setNights(n);
  };

  const allPhotos = photoTour?.allPhotos || listing?.heroPhotos || [];
  const isModalOpen = photoTourOpen || lightboxOpen || amenitiesModalOpen;

  return (
    <div className="min-h-full bg-white text-[#222222]">
      {/* Top Main Navbar */}
      <Navbar />

      {/* Sticky Scroll-Spy Navbar */}
      <StickyNav
        isVisible={showStickyNav && !isModalOpen}
        priceText={`₹28,499 for ${nights || 5} nights`}
        ratingText={`★ ${listing?.rating?.overall || 4.95} · ${reviewsData?.reviews?.length || 19} reviews`}
        onReserveClick={handleReserve}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1120px] px-6 lg:px-0">
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-[#ff385c] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#717171] text-sm">Loading complete listing details from Spring Boot backend...</p>
          </div>
        )}

        {error && (
          <div className="my-12 p-6 border border-rose-200 bg-rose-50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-rose-800">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base">Unable to connect to backend (http://localhost:8081)</h3>
                <p className="text-sm text-rose-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {!loading && listing && (
          <>
            {/* Listing Title Header */}
            <ListingHeader
              title={listing.title}
              isSaved={isSaved}
              onToggleSave={handleToggleSave}
            />

            {/* Photos Mosaic */}
            <div id="photos">
              <HeroGallery
                photos={listing.heroPhotos || []}
                totalPhotosCount={listing.totalPhotos || 21}
                onOpenPhotoTour={handleOpenPhotoTour}
                onOpenLightbox={handleOpenLightbox}
              />
            </div>

            {/* Two-Column Grid: Left Content (Overview, Sleep, Amenities, Calendar) & Right Sticky Reservation Sidebar */}
            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[652px_372px] lg:gap-[96px]">
              {/* Left Column: Listing Sections */}
              <div className="min-w-0">
                {/* 1. Property Intro, Guest Favourite & Host Specs */}
                <OverviewSection
                  propertyType={listing.propertyType}
                  maxGuests={listing.maxGuests}
                  bedrooms={listing.bedrooms}
                  beds={listing.beds}
                  bathrooms={listing.bathrooms}
                  host={listing.host}
                  rating={listing.rating?.overall}
                  reviewsCount={listing.rating?.totalReviews}
                  description={listing.description}
                />

                {/* 2. Where You'll Sleep */}
                <SleepSection />

                {/* 3. What This Place Offers */}
                <AmenitiesSection
                  highlights={listing.highlights || []}
                  allAmenities={listing.allAmenities || []}
                  onOpenModal={() => setAmenitiesModalOpen(true)}
                />

                {/* 4. Availability Calendar */}
                <CalendarSection
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onDateChange={handleDateChange}
                />
              </div>

              {/* Right Column: Sticky Reservation Widget */}
              <div className="hidden lg:block" id="reservation-card">
                <ReservationCard
                  listing={listing}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  nights={nights}
                  onReserve={handleReserve}
                  onOpenCalendar={() => {
                    document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenReviews={() => {
                    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </div>

            {/* Full-Width Divider Line after Calendar Section matching reference */}
            <div className="w-full border-b border-[#dddddd]" />

            {/* Full-Width Section 5: Guest Favourite & Reviews */}
            <ReviewsSection
              rating={reviewsData?.ratingBreakdown || listing.rating}
              reviews={reviewsData?.reviews || []}
            />

            {/* Full-Width Section 6: Where You'll Be (Map) */}
            <LocationSection
              locationName={listing.locationName}
              description={listing.locationDescription}
            />

            {/* Full-Width Section 7: Meet Your Host */}
            <HostSection host={listing.host} />

            {/* Full-Width Section 8: Things to Know */}
            <ThingsToKnowSection
              cancellationPolicy={listing.cancellationPolicy}
              houseRules={listing.houseRules}
              safetyFeatures={listing.safetyFeatures}
            />

            {/* Full-Width Section 9: More Stays Nearby */}
            <NearbyStaysCarousel stays={listing ? undefined : []} />
          </>
        )}
      </main>

      {/* Amenities Modal */}
      {listing && (
        <AmenitiesModal
          isOpen={amenitiesModalOpen}
          amenities={listing.allAmenities || []}
          onClose={() => setAmenitiesModalOpen(false)}
        />
      )}

      {/* Photo Tour Modal */}
      {photoTour && (
        <PhotoTourModal
          isOpen={photoTourOpen}
          categories={photoTour.categories}
          allPhotos={photoTour.allPhotos}
          onClose={handleClosePhotoTour}
          onSelectPhoto={handleSelectPhotoInTour}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          listingTitle={listing?.title}
          isLightboxOpen={lightboxOpen}
        />
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        allPhotos={allPhotos}
        currentIndex={selectedPhotoIndex}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />

      {/* Floating Toast Notification for Reservation */}
      {showReserveToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#222222] text-white px-5 py-3 rounded-lg text-sm font-medium shadow-xl animate-in fade-in slide-in-from-bottom-2 pointer-events-none">
          You won't be charged yet
        </div>
      )}
    </div>
  );
}

export default App;
