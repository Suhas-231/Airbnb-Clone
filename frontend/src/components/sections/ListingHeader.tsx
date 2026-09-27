import React, { useState } from 'react';

interface ListingHeaderProps {
  title: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShareClick?: () => void;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  isSaved: externalIsSaved,
  onToggleSave: externalOnToggleSave,
  onShareClick,
}) => {
  const [internalIsSaved, setInternalIsSaved] = useState(false);
  const [localShareToast, setLocalShareToast] = useState(false);

  const isSaved = externalIsSaved !== undefined ? externalIsSaved : internalIsSaved;
  const toggleSave = () => {
    if (externalOnToggleSave) {
      externalOnToggleSave();
    } else {
      setInternalIsSaved(!internalIsSaved);
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

  return (
    <>
      <div className="flex items-start justify-between gap-4 pt-[32px] pb-[18px] h-[84.4px] box-border">
        {/* H1 Title */}
        <h1 className="text-[26px] font-medium leading-[30px] text-[#222222] m-0">
          {title}
        </h1>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-[2px]">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg px-[10px] py-[8px] h-[34.4px] box-border text-[14px] leading-[18.4px] font-medium underline hover:bg-[#f7f7f7] text-[#222222] transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-4 h-4 text-[#222222]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9 M16 3v17 M8 11l8-8 8 8" />
            </svg>
            <span>Share</span>
          </button>

          {/* Save Button */}
          <button
            onClick={toggleSave}
            className="flex items-center gap-2 rounded-lg px-[10px] py-[8px] h-[34.4px] box-border text-[14px] leading-[18.4px] font-medium underline hover:bg-[#f7f7f7] text-[#222222] transition-colors group cursor-pointer"
          >
            <svg
              viewBox="0 0 32 32"
              className={`w-4 h-4 transition-transform duration-200 group-active:scale-125 ${
                isSaved ? 'fill-[#ff385c] stroke-[#ff385c]' : 'fill-none stroke-[#222222]'
              }`}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-4.58 1.09-7 4-2.42-2.91-5.2-4-7-4a6.98 6.98 0 0 0-7 7c0 7 7 12.27 14 17z" />
            </svg>
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {localShareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#222222] text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 pointer-events-none">
          Share options
        </div>
      )}
    </>
  );
};
