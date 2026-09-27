import React from 'react';

export const SleepSection: React.FC = () => {
  return (
    <section className="border-b border-[#dddddd] py-8">
      <h2 className="mb-6 text-[22px] font-medium leading-[26px] text-[#222222]">
        Where you'll sleep
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Bedroom Card */}
        <div>
          <div className="relative mb-2 h-56 overflow-hidden rounded-xl bg-neutral-100">
            <img
              src="/images/hero4.jpg"
              alt="Bedroom with double bed"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-semibold text-[#222222]">Bedroom</p>
          <p className="text-sm text-[#717171]">1 double bed</p>
        </div>

        {/* Living Room Card */}
        <div>
          <div className="relative mb-2 h-56 overflow-hidden rounded-xl bg-neutral-100">
            <img
              src="/images/prop_01.jpg"
              alt="Living room with sofa"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-semibold text-[#222222]">Living room</p>
          <p className="text-sm text-[#717171]">1 sofa</p>
        </div>
      </div>
    </section>
  );
};
