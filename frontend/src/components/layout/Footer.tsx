import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7F7F7] border-t border-[#DDDDDD] mt-16 text-sm text-[#222222]">
      <div className="max-w-[1120px] mx-auto px-6 py-12">
        {/* Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#DDDDDD]">
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Support</h4>
            <ul className="space-y-2 text-[#222222]">
              <li><a href="#help" className="hover:underline">Help Centre</a></li>
              <li><a href="#aircover" className="hover:underline">AirCover</a></li>
              <li><a href="#anti-discrimination" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#disability" className="hover:underline">Disability support</a></li>
              <li><a href="#cancellation" className="hover:underline">Cancellation options</a></li>
              <li><a href="#concern" className="hover:underline">Report neighbourhood concern</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Hosting</h4>
            <ul className="space-y-2 text-[#222222]">
              <li><a href="#airbnb-your-home" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#aircover-for-hosts" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#hosting-resources" className="hover:underline">Hosting resources</a></li>
              <li><a href="#community-forum" className="hover:underline">Community forum</a></li>
              <li><a href="#hosting-responsibly" className="hover:underline">Hosting responsibly</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Community</h4>
            <ul className="space-y-2 text-[#222222]">
              <li><a href="#airbnb-org" className="hover:underline">Airbnb.org disaster relief</a></li>
              <li><a href="#combating-discrimination" className="hover:underline">Combating discrimination</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Airbnb</h4>
            <ul className="space-y-2 text-[#222222]">
              <li><a href="#newsroom" className="hover:underline">Newsroom</a></li>
              <li><a href="#new-features" className="hover:underline">New features</a></li>
              <li><a href="#careers" className="hover:underline">Careers</a></li>
              <li><a href="#investors" className="hover:underline">Investors</a></li>
              <li><a href="#airbnb-luxe" className="hover:underline">Airbnb Luxe</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#222222]">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#privacy" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#terms" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#sitemap" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#company" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </div>
            <div className="cursor-pointer hover:underline">
              <span>₹ INR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
