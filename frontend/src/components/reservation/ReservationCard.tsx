import React from 'react';
import { ChevronDown, Flag } from 'lucide-react';
import { Listing } from '../../types/listing';

interface ReservationCardProps {
  listing?: Listing;
  checkInDate?: string;
  checkOutDate?: string;
  nights?: number;
  onOpenCalendar?: () => void;
  onOpenReviews?: () => void;
  onReserve?: () => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  checkInDate = '10/18/2026',
  checkOutDate = '10/23/2026',
  nights = 5,
  onReserve,
}) => {
  const [showToast, setShowToast] = React.useState(false);
  const toastTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleReserveClick = () => {
    if (onReserve) {
      onReserve();
    } else {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      setShowToast(true);
      toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
    }
  };

  const formatDisplay = (dateStr: string) => {
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return dateStr;
  };

  const formattedCheckIn = formatDisplay(checkInDate);
  const formattedCheckOut = formatDisplay(checkOutDate);

  return (
    <div className="sticky top-28 flex flex-col gap-5">
      {/* 10% Discount Promotion Card matching screenshot */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#dddddd] p-4 bg-white">
        <div className="flex items-center gap-3">
          <img
            src="/images/tag_icon.png"
            alt="Discount"
            className="w-6 h-6 object-contain shrink-0"
          />
          <div className="text-sm text-[#222222] leading-snug">
            <p className="font-normal text-[#222222]">Get 10% off your next stay.</p>
            <button
              type="button"
              className="font-medium underline cursor-pointer hover:text-black block text-left"
            >
              Terms apply
            </button>
          </div>
        </div>
        <button
          type="button"
          className="rounded-xl bg-[#f7f7f7] hover:bg-[#e8e8e8] px-5 py-2.5 text-sm font-semibold text-[#222222] transition-colors cursor-pointer shrink-0"
        >
          Claim
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="rounded-2xl border border-[#dddddd] p-6 shadow-sm bg-white">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="text-xl">
            <span className="font-semibold text-[#222222] underline">₹28,499</span>{' '}
            <span className="text-[#222222]">for {nights} nights</span>
          </p>
        </div>

        {/* Check-in, Checkout, and Guests unified container matching Screenshot 2026-09-24 120853.png */}
        <div className="mb-4 rounded-xl border border-[#b0b0b0] overflow-hidden">
          {/* Top Row: Check-in and Checkout */}
          <div className="grid grid-cols-2 border-b border-[#b0b0b0]">
            <div className="border-r border-[#b0b0b0] p-3 cursor-pointer hover:bg-black/[0.02] transition-colors">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#222222]">
                CHECK-IN
              </p>
              <p className="text-sm text-[#222222] mt-0.5">{formattedCheckIn}</p>
            </div>
            <div className="p-3 cursor-pointer hover:bg-black/[0.02] transition-colors">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#222222]">
                CHECKOUT
              </p>
              <p className="text-sm text-[#222222] mt-0.5">{formattedCheckOut}</p>
            </div>
          </div>

          {/* Bottom Row: Guests */}
          <div className="flex w-full items-center justify-between p-3 cursor-pointer hover:bg-black/[0.02] transition-colors">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#222222]">
                GUESTS
              </p>
              <p className="text-sm text-[#222222] mt-0.5">
                2 guests
              </p>
            </div>
            <ChevronDown size={18} className="text-[#222222] mr-1" />
          </div>
        </div>

        <p className="mb-4 rounded-md bg-[#f7f7f7] px-3 py-2 text-center text-sm text-[#222222]">
          Free cancellation before <span className="font-semibold">17 October</span>
        </p>

        <button
          id="normal-reserve-btn"
          type="button"
          onClick={handleReserveClick}
          className="w-full h-[48px] flex items-center justify-center rounded-lg bg-gradient-to-r from-[#e61e53] via-[#e51d56] to-[#d70466] font-semibold text-white transition-opacity hover:opacity-95 shadow-sm text-base cursor-pointer"
        >
          Reserve
        </button>

        <p className="mt-3 text-center text-sm text-[#717171]">You won't be charged yet</p>
      </div>

      <button className="flex items-center gap-2 self-center text-sm text-[#717171] underline hover:text-[#222222] cursor-pointer">
        <Flag size={14} />
        Report this listing
      </button>

      {/* Floating Toast Notification */}
      {!onReserve && showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#222222] text-white px-5 py-3 rounded-lg text-sm font-medium shadow-xl animate-in fade-in slide-in-from-bottom-2 pointer-events-none">
          You won't be charged yet
        </div>
      )}
    </div>
  );
};
