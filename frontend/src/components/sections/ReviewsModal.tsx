import React, { useEffect, useRef, useState } from 'react';
import { X, Search, Star } from 'lucide-react';
import { Review, RatingBreakdown } from '../../types/listing';

interface ReviewsModalProps {
  isOpen: boolean;
  reviews: Review[];
  rating: RatingBreakdown;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  reviews,
  rating,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => modalRef.current?.focus(), 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredReviews = reviews.filter(
    (r) =>
      r.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="All reviews"
        tabIndex={-1}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EBEBEB] flex items-center justify-between">
          <button
            onClick={onClose}
            aria-label="Close reviews modal"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-[#222222] focus:outline-none focus:ring-2 focus:ring-black"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-[#222222] text-[#222222]" />
            <span className="text-xl font-bold text-[#222222]">
              {rating.overall} · {reviews.length} reviews
            </span>
          </div>
          <div className="w-9" />
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
          {/* Left Summary */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-base text-[#222222]">Overall rating</h3>
              {[5, 4, 3, 2, 1].map((stars) => {
                const pct = rating.starDistribution[String(stars)] || 0;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs text-[#222222]">
                    <span className="w-3">{stars}</span>
                    <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#222222]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 pt-4 border-t border-[#EBEBEB]">
              <div className="flex justify-between text-sm">
                <span className="text-[#717171]">Cleanliness</span>
                <span className="font-semibold text-[#222222]">{rating.cleanliness.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717171]">Accuracy</span>
                <span className="font-semibold text-[#222222]">{rating.accuracy.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717171]">Check-in</span>
                <span className="font-semibold text-[#222222]">{rating.checkIn.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717171]">Communication</span>
                <span className="font-semibold text-[#222222]">{rating.communication.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717171]">Location</span>
                <span className="font-semibold text-[#222222]">{rating.location.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717171]">Value</span>
                <span className="font-semibold text-[#222222]">{rating.value.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Right Reviews List */}
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#717171] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reviews"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#DDDDDD] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* List */}
            <div className="space-y-6 divide-y divide-[#EBEBEB]">
              {filteredReviews.map((review) => (
                <div key={review.id} className="pt-6 first:pt-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: review.authorAvatar || '#EA580C' }}
                    >
                      {review.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#222222]">{review.authorName}</h4>
                      <p className="text-xs text-[#717171]">{review.authorTenure}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#717171]">
                    <div className="flex text-[#222222]">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span>·</span>
                    <span>{review.date}</span>
                  </div>

                  <p className="text-sm text-[#222222] leading-relaxed">{review.content}</p>
                </div>
              ))}
              {filteredReviews.length === 0 && (
                <p className="text-sm text-[#717171] py-8 text-center">No reviews found matching "{searchTerm}".</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
