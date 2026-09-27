import React, { useEffect, useRef } from 'react';
import {
  X,
  Wind,
  Tv,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  Dumbbell,
  PawPrint,
  Camera,
  Coffee,
  Wine,
  Utensils,
  Sparkles,
  Calendar,
  Layers,
  Sun,
  Key,
} from 'lucide-react';

interface AmenitiesModalProps {
  isOpen: boolean;
  amenities?: unknown[];
  onClose: () => void;
}

interface AmenityEntry {
  name: string;
  isStrikethrough?: boolean;
}

interface AmenityCategory {
  category: string;
  items: AmenityEntry[];
}

const EXACT_CATEGORIES: AmenityCategory[] = [
  {
    category: 'Bathroom',
    items: [
      { name: 'Hairdryer' },
      { name: 'Cleaning products' },
      { name: 'Shampoo' },
      { name: 'Hot water' },
      { name: 'Shower gel' },
    ],
  },
  {
    category: 'Bedroom and laundry',
    items: [
      { name: 'Washing machine' },
      { name: 'Hangers' },
      { name: 'Bed linen' },
      { name: 'Room-darkening blinds' },
      { name: 'Iron' },
      { name: 'Clothes storage' },
      { name: 'Cot' },
    ],
  },
  {
    category: 'Entertainment',
    items: [{ name: 'TV' }],
  },
  {
    category: 'Family',
    items: [{ name: 'Cot' }],
  },
  {
    category: 'Heating and cooling',
    items: [
      { name: 'Air conditioning' },
      { name: 'Ceiling fan' },
    ],
  },
  {
    category: 'Home safety',
    items: [
      { name: 'Exterior security cameras on property' },
      { name: 'Carbon monoxide alarm', isStrikethrough: true },
      { name: 'Smoke alarm', isStrikethrough: true },
    ],
  },
  {
    category: 'Internet and office',
    items: [
      { name: 'Wifi' },
      { name: 'Dedicated workspace' },
    ],
  },
  {
    category: 'Kitchen and dining',
    items: [
      { name: 'Kitchen' },
      { name: 'Fridge' },
      { name: 'Freezer' },
      { name: 'Microwave' },
      { name: 'Cooking basics' },
      { name: 'Crockery and cutlery' },
      { name: 'Kettle' },
      { name: 'Coffee' },
      { name: 'Wine glasses' },
      { name: 'Toaster' },
      { name: 'Blender' },
      { name: 'Cooker' },
    ],
  },
  {
    category: 'Location features',
    items: [{ name: 'Private entrance' }],
  },
  {
    category: 'Outdoor',
    items: [
      { name: 'Patio or balcony' },
      { name: 'Outdoor dining area' },
    ],
  },
  {
    category: 'Parking and facilities',
    items: [
      { name: 'Free parking on premises' },
      { name: 'Pool' },
      { name: 'Hot tub' },
      { name: 'Gym' },
    ],
  },
  {
    category: 'Services',
    items: [
      { name: 'Pets allowed' },
      { name: 'Cleaning available during stay' },
      { name: 'Long-term stays allowed' },
      { name: 'Self check-in' },
    ],
  },
];

function RenderItemIcon({ name, isStrikethrough }: { name: string; isStrikethrough?: boolean }) {
  const cls = `w-6 h-6 shrink-0 ${isStrikethrough ? 'text-[#717171]' : 'text-[#222222]'}`;
  const lower = name.toLowerCase();

  if (isStrikethrough) {
    return (
      <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6 text-[#717171]"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 9h6v6H9z" />
        </svg>
      </div>
    );
  }

  if (lower.includes('hairdryer')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M6 13h5l4-4V5H9L5 9v4z" />
        <path d="M11 13v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-3" />
        <circle cx="7" cy="11" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (lower.includes('cleaning products')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M9 3h6v3H9z" />
        <path d="M8 6h8l1 14H7L8 6z" />
        <path d="M12 10v4" />
      </svg>
    );
  }
  if (lower.includes('shampoo') || lower.includes('shower gel')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M10 2h4v3h-4z" />
        <path d="M8 5h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
        <path d="M10 11h4" />
      </svg>
    );
  }
  if (lower.includes('hot water')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M4 14h16" />
        <path d="M6 18h12" />
        <path d="M7 6c0 3 2 4 2 6" />
        <path d="M12 6c0 3 2 4 2 6" />
        <path d="M17 6c0 3 2 4 2 6" />
      </svg>
    );
  }
  if (lower.includes('washing machine')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="13" r="5" />
        <line x1="8" y1="6" x2="8.01" y2="6" strokeWidth="2" />
        <line x1="12" y1="6" x2="12.01" y2="6" strokeWidth="2" />
      </svg>
    );
  }
  if (lower.includes('hanger')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M12 4a2 2 0 0 1 2 2c0 1.5-1.5 2-2 3l-9 8h18l-9-8" />
        <line x1="3" y1="17" x2="21" y2="17" />
      </svg>
    );
  }
  if (lower.includes('bed linen')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M4 6h16a2 2 0 0 1 2 2v10H2V8a2 2 0 0 1 2-2z" />
        <path d="M2 13h20" />
      </svg>
    );
  }
  if (lower.includes('blinds')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="4" y="3" width="16" height="14" rx="1" />
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="11" x2="20" y2="11" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (lower.includes('iron')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M4 17h16a2 2 0 0 0 2-2c0-4-3-7-7-7H4v9z" />
        <line x1="4" y1="10" x2="4" y2="17" />
      </svg>
    );
  }
  if (lower.includes('clothes storage')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="10" y1="12" x2="10.01" y2="12" strokeWidth="2" />
        <line x1="14" y1="12" x2="14.01" y2="12" strokeWidth="2" />
      </svg>
    );
  }
  if (lower.includes('cot')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="3" y="6" width="18" height="11" rx="1" />
        <line x1="7" y1="6" x2="7" y2="17" />
        <line x1="17" y1="6" x2="17" y2="17" />
        <line x1="3" y1="17" x2="3" y2="21" />
        <line x1="21" y1="17" x2="21" y2="21" />
      </svg>
    );
  }
  if (lower.includes('tv')) return <Tv className={cls} strokeWidth={1.5} />;
  if (lower.includes('air conditioning')) return <Wind className={cls} strokeWidth={1.5} />;
  if (lower.includes('ceiling fan')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9V3a2 2 0 0 1 2-2h1" />
        <path d="M15 12h6a2 2 0 0 1 2 2v1" />
        <path d="M12 15v6a2 2 0 0 1-2 2H9" />
        <path d="M9 12H3a2 2 0 0 1-2-2V9" />
      </svg>
    );
  }
  if (lower.includes('camera')) return <Camera className={cls} strokeWidth={1.5} />;
  if (lower.includes('wifi')) return <Wifi className={cls} strokeWidth={1.5} />;
  if (lower.includes('workspace')) return <Laptop className={cls} strokeWidth={1.5} />;
  if (lower.includes('kitchen')) return <Utensils className={cls} strokeWidth={1.5} />;
  if (lower.includes('fridge') || lower.includes('freezer')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <line x1="5" y1="10" x2="19" y2="10" />
        <line x1="8" y1="6" x2="8" y2="8" />
        <line x1="8" y1="13" x2="8" y2="16" />
      </svg>
    );
  }
  if (lower.includes('microwave')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <rect x="5" y="7" width="9" height="8" rx="1" />
        <circle cx="17" cy="9" r="1" fill="currentColor" />
        <circle cx="17" cy="13" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (lower.includes('cooking basics')) return <Utensils className={cls} strokeWidth={1.5} />;
  if (lower.includes('crockery') || lower.includes('cutlery')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    );
  }
  if (lower.includes('kettle')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M6 10h11a3 3 0 0 1 3 3v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4a3 3 0 0 1 2-3z" />
        <path d="M9 10V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
        <line x1="3" y1="13" x2="6" y2="13" />
      </svg>
    );
  }
  if (lower.includes('coffee')) return <Coffee className={cls} strokeWidth={1.5} />;
  if (lower.includes('wine')) return <Wine className={cls} strokeWidth={1.5} />;
  if (lower.includes('toaster')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M5 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
        <line x1="8" y1="6" x2="8" y2="3" />
        <line x1="16" y1="6" x2="16" y2="3" />
      </svg>
    );
  }
  if (lower.includes('blender')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M8 4h8l-1 10H9L8 4z" />
        <rect x="7" y="14" width="10" height="6" rx="1" />
      </svg>
    );
  }
  if (lower.includes('cooker')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="8" r="2" />
        <circle cx="8" cy="16" r="2" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    );
  }
  if (lower.includes('private entrance')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="6" y="3" width="12" height="18" rx="1" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (lower.includes('patio') || lower.includes('balcony')) return <Sun className={cls} strokeWidth={1.5} />;
  if (lower.includes('outdoor dining')) return <Utensils className={cls} strokeWidth={1.5} />;
  if (lower.includes('parking')) return <Car className={cls} strokeWidth={1.5} />;
  if (lower.includes('pool')) return <Waves className={cls} strokeWidth={1.5} />;
  if (lower.includes('hot tub')) return <Bath className={cls} strokeWidth={1.5} />;
  if (lower.includes('gym')) return <Dumbbell className={cls} strokeWidth={1.5} />;
  if (lower.includes('pet')) return <PawPrint className={cls} strokeWidth={1.5} />;
  if (lower.includes('cleaning available')) return <Sparkles className={cls} strokeWidth={1.5} />;
  if (lower.includes('long-term')) return <Calendar className={cls} strokeWidth={1.5} />;
  if (lower.includes('self check-in')) return <Key className={cls} strokeWidth={1.5} />;

  return <Layers className={cls} strokeWidth={1.5} />;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  // Escape and focus trap
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="What this place offers"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl relative outline-none animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
      >
        {/* Top Close Button */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-2">
          <button
            onClick={onClose}
            aria-label="Close amenities modal"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-[#222222] focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 pb-8 flex-1">
          <h2 className="text-2xl font-bold text-[#222222] mb-6">What this place offers</h2>

          {EXACT_CATEGORIES.map((catGroup) => (
            <div key={catGroup.category} className="mb-8">
              <h3 className="text-[20px] font-semibold text-[#222222] pb-2">
                {catGroup.category}
              </h3>
              <div className="divide-y divide-[#EBEBEB]">
                {catGroup.items.map((item, idx) => (
                  <div key={idx} className="py-5 flex items-center gap-6">
                    <RenderItemIcon name={item.name} isStrikethrough={item.isStrikethrough} />
                    <span
                      className={`text-base text-[#222222] ${
                        item.isStrikethrough ? 'line-through text-[#717171]' : ''
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
