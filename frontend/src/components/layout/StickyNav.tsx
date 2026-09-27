import React, { useEffect, useState } from 'react';

interface StickyNavProps {
  isVisible: boolean;
  priceText?: string;
  ratingText?: string;
  onReserveClick?: () => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({
  isVisible,
  onReserveClick,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'amenities' | 'reviews' | 'location'>('photos');

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const amenitiesEl = document.getElementById('amenities');
      const reviewsEl = document.getElementById('reviews');
      const locationEl = document.getElementById('location');

      const scrollPos = window.scrollY + 120;

      if (locationEl && scrollPos >= locationEl.offsetTop) {
        setActiveTab('location');
      } else if (reviewsEl && scrollPos >= reviewsEl.offsetTop) {
        setActiveTab('reviews');
      } else if (amenitiesEl && scrollPos >= amenitiesEl.offsetTop) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const scrollToSection = (id: string) => {
    if (id === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleReserve = () => {
    if (onReserveClick) {
      onReserveClick();
    } else {
      const normalReserveBtn = document.getElementById('normal-reserve-btn') as HTMLButtonElement | null;
      if (normalReserveBtn) {
        normalReserveBtn.click();
      } else {
        const resCard = document.getElementById('reservation-card');
        if (resCard) {
          resCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Sticky navigation bar"
      className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-[#dddddd]"
    >
      <div className="max-w-[1120px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Navigation Tabs */}
        <nav aria-label="Section navigation" className="flex items-center gap-8 h-full">
          <button
            onClick={() => scrollToSection('photos')}
            className={`h-full flex items-center text-sm font-semibold transition-colors relative cursor-pointer ${
              activeTab === 'photos'
                ? 'text-[#222222] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#222222]'
                : 'text-[#717171] hover:text-[#222222]'
            }`}
          >
            Photos
          </button>

          <button
            onClick={() => scrollToSection('amenities')}
            className={`h-full flex items-center text-sm font-semibold transition-colors relative cursor-pointer ${
              activeTab === 'amenities'
                ? 'text-[#222222] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#222222]'
                : 'text-[#717171] hover:text-[#222222]'
            }`}
          >
            Amenities
          </button>

          <button
            onClick={() => scrollToSection('reviews')}
            className={`h-full flex items-center text-sm font-semibold transition-colors relative cursor-pointer ${
              activeTab === 'reviews'
                ? 'text-[#222222] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#222222]'
                : 'text-[#717171] hover:text-[#222222]'
            }`}
          >
            Reviews
          </button>

          <button
            onClick={() => scrollToSection('location')}
            className={`h-full flex items-center text-sm font-semibold transition-colors relative cursor-pointer ${
              activeTab === 'location'
                ? 'text-[#222222] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#222222]'
                : 'text-[#717171] hover:text-[#222222]'
            }`}
          >
            Location
          </button>
        </nav>

        {/* Right Compact Price & Reserve Button */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:flex flex-col text-sm text-[#222222]">
            <span className="font-semibold text-sm"><span className="underline">₹28,499</span> <span className="font-normal text-xs text-[#222222]">for 5 nights</span></span>
            <span className="text-xs font-semibold text-[#222222]">★ 4.95 · 19 reviews</span>
          </div>

          <button
            id="sticky-reserve-btn"
            onClick={handleReserve}
            className="rounded-full bg-gradient-to-r from-[#e61e53] to-[#d70466] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-95 shadow-sm cursor-pointer"
          >
            Reserve
          </button>
        </div>
      </div>
    </aside>
  );
};
