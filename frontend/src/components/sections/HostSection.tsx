import React from 'react';
import { Check, GraduationCap, Cake, Shield } from 'lucide-react';
import { Host } from '../../types/listing';

interface HostSectionProps {
  host?: Host;
}

export const HostSection: React.FC<HostSectionProps> = ({ host }) => {
  const hostName = host?.name || 'Mirashya Homes';
  const reviewsCount = host?.reviewsCount ? host.reviewsCount.toLocaleString() : '1,463';
  const rating = host?.rating || '4.68';
  const years = host?.yearsHosting || 2;

  const coHosts = [
    { name: 'Sharath', avatar: '/images/avatars/cohost_sharath.png' },
    { name: 'Aman Dev Pahwa', avatar: '/images/avatars/cohost_aman.png' },
    { name: 'Maria Karen Priyanka', avatar: '/images/avatars/cohost_maria.png' },
    { name: 'Simran', avatar: '/images/avatars/cohost_simran.png' },
    { name: 'Pallavi', avatar: '/images/avatars/cohost_pallavi.png' },
    { name: 'Sanyukta', avatar: '/images/avatars/cohost_sanyukta.png' },
    { name: 'Shruti', initial: 'S', bg: '#f9dce3', color: '#a83260' },
    { name: 'Amisha', initial: 'A', bg: '#dbeafe', color: '#1e40af' },
  ];

  return (
    <section id="host" className="border-b border-[#dddddd] py-12 scroll-mt-28">
      <h2 className="mb-6 text-[22px] font-medium leading-[26px] text-[#222222]">Meet your host</h2>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[340px_1fr] items-start">
        {/* Left: Host Summary Card */}
        <div className="w-[340px] space-y-6">
          <div className="rounded-[20px] border border-[#dddddd] p-[30px_24px] shadow-[0_6px_16px_rgba(0,0,0,0.12)] grid grid-cols-[1fr_100px] items-center">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={host?.avatar || '/images/avatars/host_logo.png'}
                  alt={hostName}
                  className="h-[88px] w-[88px] rounded-full object-cover shrink-0"
                />
                <div className="absolute bottom-1 right-0 h-7 w-7 rounded-full bg-[#ff385c] flex items-center justify-center border-2 border-white text-white">
                  <Check size={16} strokeWidth={3} />
                </div>
              </div>
              <h3 className="mt-3 text-[26px] font-medium leading-tight text-[#222222]">{hostName}</h3>
              <p className="text-[13px] text-[#222222] mt-1">Host</p>
            </div>

            <div className="border-l border-[#ebebeb] pl-5 space-y-2.5">
              <div>
                <p className="text-xl font-medium text-[#222222] leading-none">{reviewsCount}</p>
                <p className="text-[13px] text-[#717171] mt-0.5">Reviews</p>
              </div>
              <div className="h-px bg-[#ebebeb]" />
              <div>
                <p className="text-xl font-medium text-[#222222] leading-none">{rating}★</p>
                <p className="text-[13px] text-[#717171] mt-0.5">Rating</p>
              </div>
              <div className="h-px bg-[#ebebeb]" />
              <div>
                <p className="text-xl font-medium text-[#222222] leading-none">{years}</p>
                <p className="text-[13px] text-[#717171] mt-0.5">Years hosting</p>
              </div>
            </div>
          </div>

          {/* Badges below card */}
          <div className="space-y-4 text-[#222222] pt-2">
            <div className="flex items-center gap-3">
              <Cake size={20} strokeWidth={1.5} className="shrink-0" />
              <span className="text-base">Born in the 80s</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap size={20} strokeWidth={1.5} className="shrink-0" />
              <span className="text-base">Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* Right: Co-Hosts & Host Details */}
        <div>
          {/* Co-Hosts */}
          <div className="mb-[30px]">
            <h3 className="text-[18px] font-medium text-[#222222] mb-4">Co-Hosts</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:grid-cols-3">
              {coHosts.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2.5">
                  {ch.avatar ? (
                    <img
                      src={ch.avatar}
                      alt={ch.name}
                      className="h-[34px] w-[34px] rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[13px] font-medium shrink-0"
                      style={{ backgroundColor: ch.bg, color: ch.color }}
                      aria-hidden="true"
                    >
                      {ch.initial}
                    </div>
                  )}
                  <span className="text-sm text-[#222222]">{ch.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host details */}
          <div>
            <h3 className="text-[18px] font-medium text-[#222222] mb-4">Host details</h3>
            <div className="text-[15px] leading-[1.6] text-[#222222]">
              <p>Response rate: 100%</p>
              <p>Responds within an hour</p>
            </div>

            <button className="mt-[18px] h-12 rounded-lg bg-[#f7f7f7] border border-[#222222] px-6 font-medium text-[15px] text-[#222222] hover:bg-[#ebebeb] transition-colors cursor-pointer inline-flex items-center justify-center">
              Message host
            </button>
          </div>

          {/* Protection notice */}
          <div className="flex items-start gap-2.5 text-xs text-[#717171] mt-[30px]">
            <Shield size={24} className="shrink-0 text-[#222222]" strokeWidth={1.5} />
            <p className="leading-tight">
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
