import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarSectionProps {
  checkInDate?: string;
  checkOutDate?: string;
  onDateChange?: (checkIn: string, checkOut: string, nights: number) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = () => {
  return (
    <section className="pt-8 pb-[50.8px]">
      <h2 className="text-[22px] font-medium leading-[26px] text-[#222222]">
        5 nights in Candolim
      </h2>
      <p className="mt-1 text-sm text-[#717171]">
        18 Oct 2026 - 23 Oct 2026
      </p>

      {/* 2 Month Side-by-Side Static View matching reference */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Month 1: October 2026 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              className="rounded-full p-2 hover:bg-[#f7f7f7] cursor-pointer"
            >
              <ChevronLeft size={18} className="text-[#222222]" />
            </button>
            <h4 className="font-semibold text-base text-[#222222] pr-6">October 2026</h4>
            <div className="w-5" />
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#717171]">
            <span className="h-9 flex items-center justify-center">S</span>
            <span className="h-9 flex items-center justify-center">M</span>
            <span className="h-9 flex items-center justify-center">T</span>
            <span className="h-9 flex items-center justify-center">W</span>
            <span className="h-9 flex items-center justify-center">T</span>
            <span className="h-9 flex items-center justify-center">F</span>
            <span className="h-9 flex items-center justify-center">S</span>

            {/* Empty slots before Oct 1 (Thu) */}
            <span />
            <span />
            <span />
            <span />

            {/* Oct 1-3 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">1</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">2</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">3</span>

            {/* Oct 4-10 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">4</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">5</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">6</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">7</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">8</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">9</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">10</span>

            {/* Oct 11-17 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">11</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">12</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">13</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">14</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">15</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">16</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">17</span>

            {/* Oct 18-24 */}
            <div className="h-10 flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-[#222222] text-white font-semibold flex items-center justify-center text-sm">
                18
              </span>
            </div>
            <div className="h-10 flex items-center justify-center bg-[#f7f7f7]">
              <span className="text-sm font-semibold text-[#222222]">19</span>
            </div>
            <div className="h-10 flex items-center justify-center bg-[#f7f7f7]">
              <span className="text-sm font-semibold text-[#222222]">20</span>
            </div>
            <div className="h-10 flex items-center justify-center bg-[#f7f7f7]">
              <span className="text-sm font-semibold text-[#222222]">21</span>
            </div>
            <div className="h-10 flex items-center justify-center bg-[#f7f7f7]">
              <span className="text-sm font-semibold text-[#222222]">22</span>
            </div>
            <div className="h-10 flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-[#222222] text-white font-semibold flex items-center justify-center text-sm">
                23
              </span>
            </div>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">24</span>

            {/* Oct 25-31 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">25</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">26</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">27</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">28</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">29</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">30</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">31</span>
          </div>
        </div>

        {/* Month 2: November 2026 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="w-5" />
            <h4 className="font-semibold text-base text-[#222222] pl-6">November 2026</h4>
            <button
              type="button"
              aria-label="Next month"
              className="rounded-full p-2 hover:bg-[#f7f7f7] cursor-pointer"
            >
              <ChevronRight size={18} className="text-[#222222]" />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#717171]">
            <span className="h-9 flex items-center justify-center">S</span>
            <span className="h-9 flex items-center justify-center">M</span>
            <span className="h-9 flex items-center justify-center">T</span>
            <span className="h-9 flex items-center justify-center">W</span>
            <span className="h-9 flex items-center justify-center">T</span>
            <span className="h-9 flex items-center justify-center">F</span>
            <span className="h-9 flex items-center justify-center">S</span>

            {/* Nov 1-7 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">1</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">2</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">3</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">4</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">5</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">6</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">7</span>

            {/* Nov 8-14 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">8</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">9</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">10</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">11</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">12</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">13</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">14</span>

            {/* Nov 15-21 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">15</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">16</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">17</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">18</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">19</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">20</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">21</span>

            {/* Nov 22-28 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">22</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">23</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">24</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">25</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">26</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">27</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#222222]">28</span>

            {/* Nov 29-30 */}
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">29</span>
            <span className="h-10 flex items-center justify-center text-sm text-[#dddddd]">30</span>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <div className="mt-[19.4px] flex items-center justify-between">
        <button
          type="button"
          aria-label="Keyboard shortcuts"
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/keyboard_sticker.png"
            alt="Keyboard shortcuts"
            className="h-[27px] w-auto object-contain block"
          />
        </button>
        <button
          type="button"
          className="px-[6px] py-[1px] text-sm leading-[18.4px] font-medium underline text-[#222222] cursor-pointer hover:text-black"
        >
          Clear dates
        </button>
      </div>
    </section>
  );
};
