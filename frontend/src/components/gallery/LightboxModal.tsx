import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PhotoItem } from '../../types/listing';

interface LightboxModalProps {
  isOpen: boolean;
  allPhotos: PhotoItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  allPhotos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const total = allPhotos.length;
  const currentPhoto = allPhotos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < total - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      setImageLoaded(false);
      onNavigate(currentIndex - 1);
    }
  }, [hasPrev, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      setImageLoaded(false);
      onNavigate(currentIndex + 1);
    }
  }, [hasNext, currentIndex, onNavigate]);

  // Keep references updated for stable keydown listener
  const handlePrevRef = useRef(handlePrev);
  const handleNextRef = useRef(handleNext);
  const onCloseRef = useRef(onClose);
  handlePrevRef.current = handlePrev;
  handleNextRef.current = handleNext;
  onCloseRef.current = onClose;

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || total === 0) return;
    if (hasPrev) {
      const prevImg = new Image();
      prevImg.src = allPhotos[currentIndex - 1].url;
    }
    if (hasNext) {
      const nextImg = new Image();
      nextImg.src = allPhotos[currentIndex + 1].url;
    }
  }, [isOpen, currentIndex, hasPrev, hasNext, allPhotos, total]);

  // Focus preservation on open/close
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        if (previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen]);

  // Global keydown handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onCloseRef.current();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextRef.current();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevRef.current();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true); // Use capture to handle first
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${currentIndex + 1} of ${total}: ${currentPhoto.title}`}
      tabIndex={-1}
      className="fixed inset-0 z-[60] flex flex-col bg-white select-none outline-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-[#EBEBEB] bg-white flex-shrink-0 z-20">
        {/* Left: Return-to-Photo-Tour grid button matching reference image */}
        <button
          onClick={onClose}
          aria-label="Return to photo tour"
          title="Return to photo tour"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#222222] hover:bg-neutral-100 transition-colors focus:outline-none cursor-pointer"
        >
          <svg
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-[#222222]"
            aria-hidden="true"
          >
            <circle cx="3" cy="3" r="1.5" />
            <circle cx="8" cy="3" r="1.5" />
            <circle cx="13" cy="3" r="1.5" />
            <circle cx="3" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="13" cy="8" r="1.5" />
            <circle cx="3" cy="13" r="1.5" />
            <circle cx="8" cy="13" r="1.5" />
            <circle cx="13" cy="13" r="1.5" />
          </svg>
        </button>

        {/* Center: Category Title */}
        <h2 className="text-base font-medium text-[#222222] tracking-tight">
          {currentPhoto.categoryTitle}
        </h2>

        {/* Right: Counter & Close button */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-normal text-[#222222] tabular-nums">
            {currentIndex + 1} of {total}
          </span>
          <button
            onClick={onClose}
            aria-label="Close photo viewer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#222222] hover:bg-neutral-100 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Image Viewing Container */}
      <div className="relative flex-1 flex items-center justify-center px-12 md:px-20 py-4 overflow-hidden">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          aria-label="Previous photo"
          className={`absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center transition-all ${
            hasPrev
              ? 'opacity-100 hover:scale-105 hover:bg-neutral-50 active:scale-95 cursor-pointer text-[#222222]'
              : 'opacity-30 cursor-not-allowed text-neutral-400'
          } focus:outline-none focus:ring-0`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Centered Image with smooth transition */}
        <div className="relative flex items-center justify-center max-w-[85vw] max-h-[calc(100vh-140px)]">
          <img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.title}
            onLoad={() => setImageLoaded(true)}
            className={`max-w-full max-h-[calc(100vh-140px)] object-contain transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-80'
            }`}
          />
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          disabled={!hasNext}
          aria-label="Next photo"
          className={`absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center transition-all ${
            hasNext
              ? 'opacity-100 hover:scale-105 hover:bg-neutral-50 active:scale-95 cursor-pointer text-[#222222]'
              : 'opacity-30 cursor-not-allowed text-neutral-400'
          } focus:outline-none focus:ring-0`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
