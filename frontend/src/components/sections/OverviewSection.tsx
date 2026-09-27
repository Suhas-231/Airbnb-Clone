import React, { useState } from 'react';
import { Star, ShoppingBag, Fan, DoorClosed, ChevronRight } from 'lucide-react';
import { Host } from '../../types/listing';

interface OverviewSectionProps {
  propertyType: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  host: Host;
  rating?: number;
  totalReviews?: number;
  reviewsCount?: number;
  description?: string;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  propertyType,
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
  host,
  rating = 4.95,
  totalReviews = 19,
  reviewsCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayReviews = reviewsCount !== undefined ? reviewsCount : totalReviews;

  return (
    <>
      {/* 1. Property Specs */}
      <div className="border-b border-[#dddddd] pb-6">
        <h2 className="text-[22px] font-medium leading-[26px] text-[#222222]">
          {propertyType}
        </h2>

        <p className="mt-1.5 text-base text-[#222222]">
          {maxGuests} guests · {bedrooms} bedroom · {beds} bed · {bathrooms} bathroom
        </p>
      </div>

      {/* 2. Guest Favourite Banner Card */}
      <div className="mt-3 mb-0">
        <div className="flex items-center justify-between gap-5 rounded-2xl border border-[#dddddd] px-7 py-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/guest_favourite_sticker.png"
              alt="Guest favourite"
              className="h-10 object-contain shrink-0"
            />

            <p className="text-sm font-medium text-[#222222] max-w-[240px]">
              One of the most loved homes on Airbnb, according to guests
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold leading-none">
                {rating.toFixed(2)}
              </p>

              <div
                className="mt-1 flex gap-0.5 justify-center"
                aria-hidden="true"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-2.5 h-2.5 fill-[#222222] stroke-none"
                  />
                ))}
              </div>
            </div>

            <span className="h-8 w-px bg-[#dddddd]"></span>

            <div className="text-center">
              <p className="text-lg font-semibold leading-none">
                {displayReviews}
              </p>

              <p className="mt-1 text-xs text-[#222222] underline font-medium">
                Reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Host Intro Row */}
      <div className="flex items-center gap-4 border-b border-[#dddddd] py-[26px]">
        <img
          src={host.avatar || '/images/avatars/host_logo.png'}
          alt={host.name}
          className="h-[46px] w-[46px] rounded-full object-cover shrink-0"
        />

        <div>
          <h3 className="font-semibold text-base text-[#222222]">
            Hosted by {host.name}
          </h3>

          <p className="text-sm text-[#717171]">
            {host.tenure}
          </p>
        </div>
      </div>

      {/* 4. Feature Highlights */}
      <div className="border-b border-[#dddddd] pt-1.5 pb-8 space-y-6">
        <div className="flex items-start gap-4">
          <ShoppingBag
            className="w-6 h-6 text-[#222222] shrink-0 mt-0.5"
            strokeWidth={1.5}
          />

          <div>
            <h4 className="font-semibold text-[#222222] text-base">
              Outdoor entertainment
            </h4>

            <p className="text-sm text-[#717171]">
              The pool and alfresco dining are great for summer trips.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Fan
            className="w-6 h-6 text-[#222222] shrink-0 mt-0.5"
            strokeWidth={1.5}
          />

          <div>
            <h4 className="font-semibold text-[#222222] text-base">
              Designed for staying cool
            </h4>

            <p className="text-sm text-[#717171]">
              Beat the heat with the A/C and ceiling fan.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <DoorClosed
            className="w-6 h-6 text-[#222222] shrink-0 mt-0.5"
            strokeWidth={1.5}
          />

          <div>
            <h4 className="font-semibold text-[#222222] text-base">
              Self check-in
            </h4>

            <p className="text-sm text-[#717171]">
              You can check in with the building staff.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Auto-translated Disclaimer */}
      <div className="pt-[17px] pb-2">
        <div className="flex items-center gap-2.5 bg-[#f7f7f7] rounded-xl p-[16px_18px] text-sm text-[#222222]">
          <span>
            Some info has been automatically translated.
          </span>{' '}

          <button className="font-semibold underline cursor-pointer hover:text-black">
            Show original
          </button>
        </div>
      </div>

      {/* 6. Property Description */}
      <div className="pt-[26px] pb-8 border-b border-[#dddddd]">
        <div className="text-[#222222] text-base leading-[24px]">
          <p
            className={isExpanded ? '' : 'overflow-hidden'}
            style={
              isExpanded
                ? {}
                : {
                    maxHeight: '6.2em',
                    maskImage:
                      'linear-gradient(rgb(0, 0, 0) 62%, transparent)',
                  }
            }
          >
            🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨
            Stay in this cozy 1BHK in the heart of Candolim, featuring a
            private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻,
            Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just
            minutes from Candolim Beach 🏖️, popular cafés, restaurants, and
            nightlife 🍹, it’s ideal for couples seeking romance, relaxation,
            and a touch of luxury in North Goa. ❤️🌴
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 font-semibold flex items-center gap-1 cursor-pointer hover:text-black text-base"
          >
            <span className="underline">
              {isExpanded ? 'Show less' : 'Show more'}
            </span>

            <ChevronRight
              className="w-4 h-4 stroke-[2.5]"
            />
          </button>
        </div>
      </div>
    </>
  );
};