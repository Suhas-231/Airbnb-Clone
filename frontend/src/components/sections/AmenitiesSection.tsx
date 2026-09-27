import React from 'react';
import {
  Utensils,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  PawPrint,
  Camera,
  BellOff
} from 'lucide-react';
import { Amenity } from '../../types/listing';

interface AmenitiesSectionProps {
  highlights?: Amenity[];
  allAmenities?: Amenity[];
  onOpenModal: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  allAmenities = [],
  onOpenModal,
}) => {
  const count = allAmenities.length || 50;

  return (
    <section id="amenities" className="border-b border-[#dddddd] pt-[26.4px] pb-8 scroll-mt-28">
      <h2 className="mb-6 text-[22px] font-medium leading-[26px] text-[#222222]">What this place offers</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex items-center gap-4 text-[#222222]">
          <Utensils size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Kitchen</span>
        </div>
        <div className="flex items-center gap-4 text-[#222222]">
          <Wifi size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Wifi</span>
        </div>
        <div className="flex items-center gap-4 text-[#222222]">
          <Laptop size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Dedicated workspace</span>
        </div>
        <div className="flex items-center gap-4 text-[#222222]">
          <Car size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Free parking on premises</span>
        </div>
        <div className="flex items-center gap-4 text-[#222222]">
          <Waves size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Pool</span>
        </div>
        <div className="flex items-center gap-4 text-[#222222]">
          <Bath size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Hot tub</span>
        </div>
        <div className="flex items-center gap-4 text-[#222222]">
          <PawPrint size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Pets allowed</span>
        </div>
        <div className="flex items-center gap-4 text-[#222222]">
          <Camera size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Exterior security cameras on property</span>
        </div>
        <div className="flex items-center gap-4 text-[#717171] line-through">
          <BellOff size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Carbon monoxide alarm</span>
        </div>
        <div className="flex items-center gap-4 text-[#717171] line-through">
          <BellOff size={22} strokeWidth={1.5} className="shrink-0" />
          <span className="text-base">Smoke alarm</span>
        </div>
      </div>

      <button
        onClick={onOpenModal}
        className="mt-8 h-[48.4px] flex items-center justify-center box-border rounded-xl border border-[#222222] bg-white px-[23px] text-base font-medium text-[#222222] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
      >
        Show all {count} amenities
      </button>
    </section>
  );
};
