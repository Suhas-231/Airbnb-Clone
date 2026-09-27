import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-[#F7F7F7] text-[#222222] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-center text-[#222222] mb-6">
          Share this place
        </h3>

        <div className="flex items-center gap-4 p-4 border border-[#DDDDDD] rounded-xl mb-6 bg-[#F7F7F7]">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src="https://images.pexels.com/photos/276746/pexels-photo-276746.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Listing thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#222222] line-clamp-1">{title}</h4>
            <p className="text-xs text-[#717171] mt-0.5">Candolim, Goa, India · Entire serviced apartment</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 p-3 border border-[#DDDDDD] rounded-xl hover:bg-[#F7F7F7] transition-colors text-left"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5 text-[#222222]" />}
            <span className="text-sm font-medium text-[#222222]">{copied ? 'Link copied!' : 'Copy Link'}</span>
          </button>

          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
            className="flex items-center gap-3 p-3 border border-[#DDDDDD] rounded-xl hover:bg-[#F7F7F7] transition-colors text-left"
          >
            <Mail className="w-5 h-5 text-[#222222]" />
            <span className="text-sm font-medium text-[#222222]">Email</span>
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 border border-[#DDDDDD] rounded-xl hover:bg-[#F7F7F7] transition-colors text-left"
          >
            <MessageCircle className="w-5 h-5 text-[#222222]" />
            <span className="text-sm font-medium text-[#222222]">WhatsApp</span>
          </a>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title, url }).catch(() => {});
              } else {
                handleCopy();
              }
            }}
            className="flex items-center gap-3 p-3 border border-[#DDDDDD] rounded-xl hover:bg-[#F7F7F7] transition-colors text-left"
          >
            <Share2 className="w-5 h-5 text-[#222222]" />
            <span className="text-sm font-medium text-[#222222]">More options</span>
          </button>
        </div>
      </div>
    </div>
  );
};
