import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { NearbyStay } from '../../types/listing';

interface NearbyStaysCarouselProps {
  stays?: NearbyStay[];
}

export const NearbyStaysCarousel: React.FC<NearbyStaysCarouselProps> = ({ stays: propStays }) => {
  const [page, setPage] = useState<1 | 2>(1);

  const defaultStays: NearbyStay[] = [
    {
      id: 'stay-1',
      title: 'Beautiful Studio with a view to die for',
      imageUrl: '/images/nearby/nearby_1_studio.jpg',
      pricePerNight: 23600,
      rating: 4.91,
      distance: 'Candolim',
    },
    {
      id: 'stay-2',
      title: 'NAQAB - 1bhk with private pool',
      imageUrl: '/images/nearby/nearby_2_naqab.jpg',
      pricePerNight: 42218,
      rating: 4.95,
      distance: 'Candolim',
    },
    {
      id: 'stay-3',
      title: 'Greentique Luxury Flat with plunge pool, Calangute',
      imageUrl: '/images/nearby/nearby_3_greentique.jpg',
      pricePerNight: 44506,
      rating: 4.94,
      distance: 'Calangute',
    },
    {
      id: 'stay-4',
      title: 'The Tropical Studio | 5 mins to Beach',
      imageUrl: '/images/nearby/nearby_4_tropical.jpg',
      pricePerNight: 22824,
      rating: 4.96,
      distance: 'Candolim',
    },
    {
      id: 'stay-5',
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      imageUrl: '/images/nearby/nearby_5_casabella.jpg',
      pricePerNight: 39942,
      rating: 4.95,
      distance: 'Calangute',
    },
    {
      id: 'stay-6',
      title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool',
      imageUrl: '/images/nearby/nearby_6_kanso.jpg',
      pricePerNight: 45648,
      rating: 5.0,
      distance: 'Candolim',
    },
    {
      id: 'stay-7',
      title: 'Luxury Apt | Private Pool | 6 Mins from Beach',
      imageUrl: '/images/nearby/nearby_7_luxury_apt.jpg',
      pricePerNight: 48786,
      rating: 4.93,
      distance: 'Candolim',
    },
    {
      id: 'stay-8',
      title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.',
      imageUrl: '/images/nearby/nearby_8_serendipity.jpg',
      pricePerNight: 22824,
      rating: 4.92,
      distance: 'Calangute',
    },
  ];

  const stayList = propStays && propStays.length > 0 ? propStays : defaultStays;

  return (
    <section className="py-12 border-t border-[#dddddd]">
      <div className="mb-[24.1px] flex items-start justify-between">
        <h2 className="text-[22px] font-medium leading-[26px] text-[#222222]">More stays nearby</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#717171] mr-1.5">{page} / 2</span>
          <button
            type="button"
            aria-label="Previous stays"
            disabled={page === 1}
            onClick={() => setPage(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#222222] cursor-pointer transition-colors bg-white"
          >
            <ChevronLeft size={12} strokeWidth={2.5} className="text-[#222222]" />
          </button>
          <button
            type="button"
            aria-label="Next stays"
            disabled={page === 2}
            onClick={() => setPage(2)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#222222] cursor-pointer transition-colors bg-white"
          >
            <ChevronRight size={12} strokeWidth={2.5} className="text-[#222222]" />
          </button>
        </div>
      </div>

      {/* Overflow Container with Slide Transition */}
      <div className="overflow-hidden w-full">
        <div
          className="flex gap-5 transition-transform duration-500 ease-in-out"
          style={{
            transform: page === 1 ? 'translateX(0)' : 'translateX(calc(-60% - 12px))',
          }}
        >
          {stayList.map((stay) => (
            <div
              key={stay.id}
              className="group cursor-pointer shrink-0 flex-[0_0_calc(20%-16px)] min-w-0"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={stay.imageUrl}
                  alt={stay.title}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium text-[#222222] leading-snug">
                {stay.title}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[13px] text-[#222222]">
                <span className="font-semibold">₹{stay.pricePerNight.toLocaleString('en-IN')}</span>
                <span className="flex items-center gap-0.5">
                  <Star size={10} fill="#222222" stroke="none" />
                  <span className="font-normal">{stay.rating.toFixed(2)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
