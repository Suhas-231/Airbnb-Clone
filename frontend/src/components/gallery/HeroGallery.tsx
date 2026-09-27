import React from 'react';
import { PhotoItem } from '../../types/listing';

interface HeroGalleryProps {
  photos: PhotoItem[];
  totalPhotosCount: number;
  onOpenPhotoTour: () => void;
  onOpenLightbox: (heroIndex: number, photoId?: number) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  photos,
  onOpenPhotoTour,
  onOpenLightbox,
}) => {
  // Swap the first and second photos to match layout
  const reorderedPhotos = [...photos];

  if (reorderedPhotos.length >= 2) {
    [reorderedPhotos[0], reorderedPhotos[1]] = [
      reorderedPhotos[1],
      reorderedPhotos[0],
    ];
  }

  const heroPhotos = reorderedPhotos.slice(0, 5);

  // First displayed photo = original second photo
  const mainPhoto = heroPhotos[0];

  // Secondary displayed photos
  const secondaryPhotos = heroPhotos.slice(1, 5);

  return (
    <div className="relative grid grid-cols-[35fr_17fr_17fr] grid-rows-2 gap-[8px] overflow-hidden rounded-[12px] h-[494px] w-full">
      {/* Main / First Photo (Left Half) */}
      {mainPhoto && (
        <button
          onClick={() => onOpenLightbox(0, mainPhoto.id)}
          className="
            relative
            overflow-hidden
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-[#ff385c]
            col-start-1
            row-start-1
            row-span-2
            w-full
            h-full
          "
          aria-label={`View photo: ${mainPhoto.title}`}
        >
          <div className="relative h-full w-full">
            <img
              alt={mainPhoto.title}
              decoding="async"
              className="
                object-cover
                absolute
                h-full
                w-full
                inset-0
                hover:brightness-95
                transition-all
              "
              src={mainPhoto.url}
            />
          </div>
        </button>
      )}

      {/* Top Middle Photo (Secondary 0 - Outdoor lounge) */}
      {secondaryPhotos[0] && (
        <button
          onClick={() => onOpenLightbox(1, secondaryPhotos[0].id)}
          className="
            relative
            overflow-hidden
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-[#ff385c]
            col-start-2
            row-start-1
            w-full
            h-full
          "
          aria-label={`View photo: ${secondaryPhotos[0].title}`}
        >
          <div className="relative h-full w-full">
            <img
              alt={secondaryPhotos[0].title}
              loading="lazy"
              decoding="async"
              className="
                object-cover
                absolute
                h-full
                w-full
                inset-0
                hover:brightness-95
                transition-all
              "
              src={secondaryPhotos[0].url}
            />
          </div>
        </button>
      )}

      {/* Top Right Photo (Secondary 1 - Jacuzzi) */}
      {secondaryPhotos[1] && (
        <button
          onClick={() => onOpenLightbox(2, secondaryPhotos[1].id)}
          className="
            relative
            overflow-hidden
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-[#ff385c]
            col-start-3
            row-start-1
            w-full
            h-full
          "
          aria-label={`View photo: ${secondaryPhotos[1].title}`}
        >
          <div className="relative h-full w-full">
            <img
              alt={secondaryPhotos[1].title}
              loading="lazy"
              decoding="async"
              className="
                object-cover
                absolute
                h-full
                w-full
                inset-0
                hover:brightness-95
                transition-all
              "
              src={secondaryPhotos[1].url}
            />
          </div>
        </button>
      )}

      {/* Bottom Middle Photo (Secondary 2 - Bedroom) */}
      {secondaryPhotos[2] && (
        <button
          onClick={() => onOpenLightbox(3, secondaryPhotos[2].id)}
          className="
            relative
            overflow-hidden
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-[#ff385c]
            col-start-2
            row-start-2
            w-full
            h-full
          "
          aria-label={`View photo: ${secondaryPhotos[2].title}`}
        >
          <div className="relative h-full w-full">
            <img
              alt={secondaryPhotos[2].title}
              loading="lazy"
              decoding="async"
              className="
                object-cover
                absolute
                h-full
                w-full
                inset-0
                hover:brightness-95
                transition-all
              "
              src={secondaryPhotos[2].url}
            />
          </div>
        </button>
      )}

      {/* Bottom Right Photo (Secondary 3 - Building) */}
      {secondaryPhotos[3] && (
        <button
          onClick={() => onOpenLightbox(4, secondaryPhotos[3].id)}
          className="
            relative
            overflow-hidden
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-[#ff385c]
            col-start-3
            row-start-2
            w-full
            h-full
          "
          aria-label={`View photo: ${secondaryPhotos[3].title}`}
        >
          <div className="relative h-full w-full">
            <img
              alt={secondaryPhotos[3].title}
              loading="lazy"
              decoding="async"
              className="
                object-cover
                absolute
                h-full
                w-full
                inset-0
                hover:brightness-95
                transition-all
              "
              src={secondaryPhotos[3].url}
            />
          </div>
        </button>
      )}

      {/* Show All Photos Button */}
      <button
        onClick={onOpenPhotoTour}
        className="
          absolute
          bottom-[24px]
          right-[24px]
          flex
          items-center
          gap-[8px]
          rounded-[8px]
          border
          border-[#222222]
          bg-white
          px-[15px]
          py-[7px]
          text-[14px]
          leading-[18px]
          font-medium
          text-[#222222]
          shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]
          hover:bg-[#f7f7f7]
          cursor-pointer
          transition-colors
          active:scale-[0.98]
        "
        aria-label="Show all photos"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-3.5 h-3.5"
          fill="currentColor"
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
        <span>Show all photos</span>
      </button>
    </div>
  );
};