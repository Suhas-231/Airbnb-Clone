import React from 'react';
import { ChevronRight, Search, Plus, Minus } from 'lucide-react';

interface LocationSectionProps {
  locationName?: string;
  description?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  locationName = 'Candolim, Goa, India',
}) => {
  return (
    <section id="location" className="border-b border-[#dddddd] pt-12 pb-[45.8px] scroll-mt-28">
      <h2 className="mb-6 text-[22px] font-medium leading-[26px] text-[#222222]">Where you'll be</h2>
      <p className="mb-6 text-base text-[#222222]">{locationName}</p>

      {/* Exact Stylized Map Canvas */}
      <div
        className="relative overflow-hidden rounded-xl border border-[#dddddd] bg-[#dbe8f1] h-[480px] ml-[5px] mt-[7px]"
        role="img"
        aria-label={`Map of ${locationName}`}
      >
        <img
          src="/images/map_exact.png"
          alt="Map showing Candolim, Goa"
          className="w-full h-full object-cover block select-none pointer-events-none"
        />

        {/* Top-Left Search Control */}
        <button
          type="button"
          aria-label="Search this area"
          className="absolute left-3 top-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#222222] cursor-pointer hover:bg-black/5"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Top-Right Zoom In/Out Controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            aria-label="Zoom in"
            className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-[#222222] cursor-pointer hover:bg-black/5"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-[#222222] cursor-pointer hover:bg-black/5"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      <p className="mt-[18px] ml-[5px] text-sm text-[#222222]">Exact location will be provided after booking.</p>

      <h3 className="mt-10 mb-3 text-[18px] font-medium leading-[24px] text-[#222222]">Neighbourhood highlights</h3>
      <p className="text-[15px] leading-[1.5] text-[#222222]">
        Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
      </p>
      <button
        type="button"
        className="mt-5 flex items-center gap-1 text-[15px] font-medium underline text-[#222222] cursor-pointer hover:text-black"
      >
        <span>Show more</span>
        <ChevronRight size={14} className="stroke-[2.5]" />
      </button>
    </section>
  );
};
