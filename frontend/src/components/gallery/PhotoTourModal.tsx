import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Share, Heart } from 'lucide-react';
import { PhotoCategory, PhotoItem } from '../../types/listing';

interface PhotoTourModalProps {
  isOpen: boolean;
  categories: PhotoCategory[];
  allPhotos: PhotoItem[];
  onClose: () => void;
  onSelectPhoto: (globalIndex: number) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  listingTitle?: string;
  isLightboxOpen?: boolean;
  onShareClick?: () => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  categories,
  allPhotos,
  onClose,
  onSelectPhoto,
  isSaved = false,
  onToggleSave,
  isLightboxOpen = false,
  onShareClick,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [localShareToast, setLocalShareToast] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Focus trap & Escape listener
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLightboxOpen) {
        e.preventDefault();
        onCloseRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, isLightboxOpen, onClose]);

  const handleScrollToCategory = (categoryId: string) => {
    const catIdx = categories.findIndex((c) => c.id === categoryId);
    const el =
      (catIdx !== -1 ? document.getElementById(`tour-room-${catIdx}`) : null) ||
      document.querySelector(`[data-category-id="${categoryId}"]`) ||
      document.getElementById(`category-${categoryId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = () => {
    if (onShareClick) {
      onShareClick();
    } else {
      setLocalShareToast(true);
      setTimeout(() => setLocalShareToast(false), 2500);
    }
  };

  const getIsFullWidth = (categoryId: string, pIdx: number, totalInCat: number): boolean => {
    const normId = categoryId.toLowerCase();
    if (normId.includes('kitchen')) {
      return false; // all paired
    }
    if (normId.includes('gym')) {
      return pIdx === 0; // photo 0 wide, 1-4 paired
    }
    if (normId.includes('bathroom')) {
      return true; // single wide photo
    }
    if (normId.includes('living') && normId.includes('2')) {
      return pIdx === 0 || pIdx === 3 || pIdx === 6;
    }
    if (normId.includes('bedroom')) {
      return pIdx === 0 || pIdx === 3;
    }
    if (normId.includes('exterior')) {
      return pIdx === 0 || pIdx === 3;
    }
    if (normId.includes('pool')) {
      return pIdx === 0;
    }
    if (normId.includes('additional')) {
      // 10 photos in additional photos: 0 wide, 1-2 pair, 3 wide, 4-5 pair, 6 wide, 7-8 pair, 9 wide
      return pIdx === 0 || pIdx === 3 || pIdx === 6 || pIdx === 9;
    }
    if (totalInCat === 1) return true;
    if (totalInCat === 3) return pIdx === 0;
    return pIdx === 0;
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour modal"
      tabIndex={-1}
      className="fixed inset-0 z-40 bg-white flex flex-col outline-none overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Bar (Full width, scrollbar does not run through it) */}
      <header
        id="tourBar"
        className="w-full flex-shrink-0 bg-white px-8 h-[88px] flex items-center justify-between z-30"
      >
        {/* Left: Back Arrow */}
        <button
          onClick={onClose}
          aria-label="Back to listing"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-[#222222] focus:outline-none cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-[#222222]" />
        </button>

        {/* Center: Title */}
        <h2 className="absolute left-1/2 -translate-x-1/2 text-[16px] leading-[22.88px] font-semibold text-[#222222]">
          Photo tour
        </h2>

        {/* Right Actions: Share & Save (Icon only) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share listing"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 text-[#222222] transition-colors focus:outline-none cursor-pointer"
          >
            <Share className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleSave}
            aria-label="Save listing"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 text-[#222222] transition-colors group focus:outline-none cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-transform group-active:scale-125 ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222222]'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Scrollable Body (Scrollbar starts here, inside the body below header) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Main Tour Content */}
        <div className="w-full max-w-[1024px] mx-auto px-6 pt-0 pb-24">
          {/* Category Quick-Jump Bar */}
          <nav
            id="tourNav"
            aria-label="Photo categories navigation"
            className="w-full max-w-[976px] mb-10"
          >
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleScrollToCategory(cat.id)}
                  className="flex flex-col items-start text-left group cursor-pointer focus:outline-none"
                >
                  <div className="w-full h-[105.19px] rounded-xl overflow-hidden mb-2 bg-neutral-100 flex-shrink-0">
                    <img
                      src={cat.coverPhotoUrl}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="w-full text-[14px] leading-[18.4px] text-[#717171] line-clamp-2">
                    {cat.title}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Categorized Sections */}
          <div className="flex flex-col">
            {categories.map((cat, idx) => (
              <section
                key={cat.id}
                id={`tour-room-${idx}`}
                data-category-id={cat.id}
                className="w-full pt-4 pb-1 scroll-mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-[458px_458px] gap-[60px] items-start">
                  {/* Left Column: Category title & tags */}
                  <div className="md:sticky md:top-4 self-start w-full max-w-[458px]">
                    <div className="w-full text-[32px] leading-[35.2px] font-semibold text-[#222222] tracking-tight">
                      {cat.title}
                    </div>
                    {cat.tags && (
                      <div className="w-full mt-[8px] text-[16px] leading-[22.4px] text-[#717171]">
                        {cat.tags.replace(/[\uFFFD]/g, '·')}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Photos in 2-column alternating grid */}
                  <div className="w-full max-w-[458px] grid grid-cols-2 gap-3">
                    {cat.photos.map((photo, pIdx) => {
                      const globalIndex = allPhotos.findIndex((p) => p.id === photo.id);
                      const isFullWidth = getIsFullWidth(cat.id, pIdx, cat.photos.length);

                      return (
                        <button
                          key={photo.id}
                          type="button"
                          data-photo-card
                          aria-label={`View photo: ${photo.title}`}
                          onClick={() => onSelectPhoto(globalIndex !== -1 ? globalIndex : 0)}
                          className={`rounded-xl overflow-hidden cursor-pointer group relative text-left p-0 border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none ${
                            isFullWidth
                              ? 'col-span-2 w-full h-[305.33px]'
                              : 'col-span-1 w-full h-[148.66px]'
                          }`}
                        >
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-300 pointer-events-none"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {localShareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#222222] text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 pointer-events-none">
          Share options
        </div>
      )}
    </div>
  );
};
