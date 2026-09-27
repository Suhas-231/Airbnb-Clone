import React from 'react';
import { CalendarX, KeyRound, ShieldCheck } from 'lucide-react';

interface ThingsToKnowSectionProps {
  cancellationPolicy?: string;
  houseRules?: string[];
  safetyFeatures?: string[];
}

export const ThingsToKnowSection: React.FC<ThingsToKnowSectionProps> = ({
  cancellationPolicy = 'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.',
  houseRules = ['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum'],
  safetyFeatures = [
    'Carbon monoxide alarm not reported',
    'Smoke alarm not reported',
    'Exterior security cameras on property',
  ],
}) => {
  return (
    <section id="things-to-know" className="py-12 scroll-mt-28">
      <h2 className="mb-6 text-[22px] font-medium leading-[26px] text-[#222222]">Things to know</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Column 1: Cancellation policy */}
        <div>
          <CalendarX size={24} className="mb-[18px] text-[#222222]" />
          <h3 className="mb-[14px] text-base font-medium text-[#222222]">Cancellation policy</h3>
          <p className="mb-2 text-sm leading-[1.5] text-[#222222]">{cancellationPolicy}</p>
          <p className="mb-2 text-sm leading-[1.5] text-[#222222]">Review this host’s full policy for details.</p>
          <button type="button" className="text-sm font-medium underline text-[#222222] hover:text-black cursor-pointer inline-block">
            Learn more
          </button>
        </div>

        {/* Column 2: House rules */}
        <div>
          <KeyRound size={24} className="mb-[18px] text-[#222222]" />
          <h3 className="mb-[14px] text-base font-medium text-[#222222]">House rules</h3>
          {houseRules.map((rule, idx) => (
            <p key={idx} className="mb-2 text-sm leading-[1.5] text-[#222222]">
              {rule}
            </p>
          ))}
          <button type="button" className="text-sm font-medium underline text-[#222222] hover:text-black cursor-pointer inline-block">
            Learn more
          </button>
        </div>

        {/* Column 3: Safety & property */}
        <div>
          <ShieldCheck size={24} className="mb-[18px] text-[#222222]" />
          <h3 className="mb-[14px] text-base font-medium text-[#222222]">Safety &amp; property</h3>
          {safetyFeatures.map((feat, idx) => (
            <p key={idx} className="mb-2 text-sm leading-[1.5] text-[#222222]">
              {feat}
            </p>
          ))}
          <button type="button" className="text-sm font-medium underline text-[#222222] hover:text-black cursor-pointer inline-block">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};
