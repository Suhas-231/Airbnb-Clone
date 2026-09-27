import React, { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { RatingBreakdown, Review } from '../../types/listing';

interface ReviewsSectionProps {
  rating?: RatingBreakdown;
  reviews?: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
}) => {
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const defaultReviews = [
    {
      id: '1',
      authorName: 'Amit',
      authorAvatar: '',
      initial: 'A',
      bgColor: '#f4ece1',
      authorTenure: '2 months on Airbnb',
      date: '1 week ago',
      rating: 5,
      content: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
    },
    {
      id: '2',
      authorName: 'Aheesh',
      authorAvatar: '/images/avatars/reviewer_aheesh.png',
      authorTenure: '3 years on Airbnb',
      date: '2 weeks ago',
      rating: 5,
      content:
        'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
      hasShowMore: true,
    },
    {
      id: '3',
      authorName: 'Samiksha',
      authorAvatar: '/images/avatars/reviewer_samiksha.png',
      authorTenure: '8 months on Airbnb',
      date: 'May 2026',
      rating: 5,
      content: 'the host nitish was really great help',
    },
    {
      id: '4',
      authorName: 'Vedant',
      authorAvatar: '',
      initial: 'V',
      bgColor: '#ebe6f5',
      authorTenure: '4 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content:
        'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....',
      hasShowMore: true,
    },
    {
      id: '5',
      authorName: 'Vaibhav S',
      authorAvatar: '/images/avatars/reviewer_vaibhav.png',
      authorTenure: '3 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content:
        "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    },
    {
      id: '6',
      authorName: 'Mohd',
      authorAvatar: '/images/avatars/reviewer_mohd.png',
      authorTenure: '5 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content: 'Great place. Exactly as described in the listing.',
    },
  ];

  const tagPills = [
    { label: 'Comfort', count: 6, icon: '/images/tag_comfort.png' },
    { label: 'Accuracy', count: 5, icon: '/images/tag_accuracy.png' },
    { label: 'Hot tub', count: 5, icon: '/images/tag_hottub.png' },
    { label: 'Condition', count: 4, icon: '/images/tag_condition.png' },
    { label: 'Hospitality', count: 8, icon: '/images/tag_hospitality.png' },
    { label: 'Cleanliness', count: 4, icon: '/images/tag_cleanliness.png' },
    { label: 'Amenities', count: 2, icon: '/images/tag_amenities.png' },
    { label: 'Decor', count: 2, icon: '/images/tag_decor.png' },
    { label: 'Indoor spaces', count: 2, icon: '/images/tag_indoorspaces.png' },
    { label: 'Location', count: 2, icon: '/images/tag_location.png' },
  ];

  const cleanlinessScore = (rating?.cleanliness ?? 5.0).toFixed(1);
  const accuracyScore = (rating?.accuracy ?? 5.0).toFixed(1);
  const checkInScore = (rating?.checkIn ?? 5.0).toFixed(1);
  const communicationScore = (rating?.communication ?? 5.0).toFixed(1);
  const locationScore = (rating?.location ?? 4.8).toFixed(1);
  const valueScore = (rating?.value ?? 4.8).toFixed(1);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const scrollSpeed = useRef(0);

  const startAutoScroll = () => {
    if (animFrameId.current !== null) return;
    const scrollLoop = () => {
      if (scrollContainerRef.current && scrollSpeed.current !== 0) {
        scrollContainerRef.current.scrollLeft += scrollSpeed.current;
        animFrameId.current = requestAnimationFrame(scrollLoop);
      } else {
        animFrameId.current = null;
      }
    };
    animFrameId.current = requestAnimationFrame(scrollLoop);
  };

  const stopAutoScroll = () => {
    scrollSpeed.current = 0;
    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = null;
    }
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX;
    const edgeThreshold = 140;

    if (mouseX > rect.right - edgeThreshold) {
      const ratio = (mouseX - (rect.right - edgeThreshold)) / edgeThreshold;
      scrollSpeed.current = Math.max(1, Math.round(ratio * 8));
      startAutoScroll();
    } else if (mouseX < rect.left + edgeThreshold) {
      const ratio = ((rect.left + edgeThreshold) - mouseX) / edgeThreshold;
      scrollSpeed.current = -Math.max(1, Math.round(ratio * 8));
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
  };

  const handleContainerMouseLeave = () => {
    stopAutoScroll();
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          const atEnd = e.deltaY > 0 && el.scrollLeft >= maxScroll - 1;
          const atStart = e.deltaY < 0 && el.scrollLeft <= 1;
          if (!atEnd && !atStart) {
            e.preventDefault();
            el.scrollLeft = Math.max(0, Math.min(maxScroll, el.scrollLeft + e.deltaY));
          }
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      stopAutoScroll();
    };
  }, []);

  return (
    <>
      {/* Centered Guest Favourite Laurel Hero Header */}
      <section className="flex flex-col items-center border-b border-[#dddddd] pt-14 pb-10 text-center">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/images/laurel_metallic_left.png"
            alt=""
            className="h-28 object-contain select-none pointer-events-none"
          />
          <span className="text-[96px] font-bold tracking-tight text-[#222222] leading-none">
            4.95
          </span>
          <img
            src="/images/laurel_metallic_right.png"
            alt=""
            className="h-28 object-contain select-none pointer-events-none"
          />
        </div>
        <h3 className="mt-4 text-[22px] font-semibold text-[#222222]">Guest favourite</h3>
        <p className="mt-2 text-base text-[#222222] max-w-[460px]">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button
          type="button"
          className="mt-2 px-[6px] py-[1px] text-sm leading-[18.4px] font-medium underline text-[#222222] cursor-pointer hover:text-black"
        >
          How reviews work
        </button>
      </section>

      {/* Reviews Details Section */}
      <section id="reviews" className="border-b border-[#dddddd] pb-12 scroll-mt-28">
        {/* 7-Column Horizontal Rating Bar matching media_1790182337830.png & Screenshot 2026-09-23 151657.png */}
        <div className="pt-2 pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 divide-y md:divide-y-0 md:divide-x divide-[#dddddd]">
            {/* 1. Overall Rating breakdown */}
            <div className="pr-6 pb-4 md:pb-0">
              <p className="text-sm font-semibold text-[#222222] mb-3">Overall rating</p>
              <div className="space-y-1.5 text-xs text-[#222222]">
                <div className="flex items-center gap-2">
                  <span className="w-2 text-[11px] font-medium text-[#222222]">5</span>
                  <div className="h-1 flex-1 rounded-full bg-[#222222]"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 text-[11px] font-medium text-[#222222]">4</span>
                  <div className="h-1 flex-1 rounded-full bg-[#ebebeb] flex items-center">
                    <div className="h-1 w-2 rounded-full bg-[#222222]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 text-[11px] font-medium text-[#222222]">3</span>
                  <div className="h-1 flex-1 rounded-full bg-[#ebebeb]"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 text-[11px] font-medium text-[#222222]">2</span>
                  <div className="h-1 flex-1 rounded-full bg-[#ebebeb]"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 text-[11px] font-medium text-[#222222]">1</span>
                  <div className="h-1 flex-1 rounded-full bg-[#ebebeb]"></div>
                </div>
              </div>
            </div>

            {/* 2. Cleanliness */}
            <div className="px-6 py-4 md:py-0">
              <p className="text-sm font-semibold text-[#222222]">Cleanliness</p>
              <p className="text-base font-semibold text-[#222222] mt-1">{cleanlinessScore}</p>
              <div className="mt-3">
                <img
                  src="/images/rating_cleanliness.png"
                  alt="Cleanliness"
                  className="h-8 w-auto object-contain shrink-0"
                />
              </div>
            </div>

            {/* 3. Accuracy */}
            <div className="px-6 py-4 md:py-0">
              <p className="text-sm font-semibold text-[#222222]">Accuracy</p>
              <p className="text-base font-semibold text-[#222222] mt-1">{accuracyScore}</p>
              <div className="mt-3">
                <img
                  src="/images/rating_accuracy.png"
                  alt="Accuracy"
                  className="h-8 w-auto object-contain shrink-0"
                />
              </div>
            </div>

            {/* 4. Check-in */}
            <div className="px-6 py-4 md:py-0">
              <p className="text-sm font-semibold text-[#222222]">Check-in</p>
              <p className="text-base font-semibold text-[#222222] mt-1">{checkInScore}</p>
              <div className="mt-3">
                <img
                  src="/images/rating_checkin.png"
                  alt="Check-in"
                  className="h-8 w-auto object-contain shrink-0"
                />
              </div>
            </div>

            {/* 5. Communication */}
            <div className="px-6 py-4 md:py-0">
              <p className="text-sm font-semibold text-[#222222]">Communication</p>
              <p className="text-base font-semibold text-[#222222] mt-1">{communicationScore}</p>
              <div className="mt-3">
                <img
                  src="/images/rating_communication.png"
                  alt="Communication"
                  className="h-8 w-auto object-contain shrink-0"
                />
              </div>
            </div>

            {/* 6. Location */}
            <div className="px-6 py-4 md:py-0">
              <p className="text-sm font-semibold text-[#222222]">Location</p>
              <p className="text-base font-semibold text-[#222222] mt-1">{locationScore}</p>
              <div className="mt-3">
                <img
                  src="/images/rating_location.png"
                  alt="Location"
                  className="h-8 w-auto object-contain shrink-0"
                />
              </div>
            </div>

            {/* 7. Value */}
            <div className="pl-6 pr-0 py-4 md:py-0">
              <p className="text-sm font-semibold text-[#222222]">Value</p>
              <p className="text-base font-semibold text-[#222222] mt-1">{valueScore}</p>
              <div className="mt-3">
                <img
                  src="/images/rating_value.png"
                  alt="Value"
                  className="h-8 w-auto object-contain shrink-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 10 Tag Pills matching reference */}
        <div
          ref={scrollContainerRef}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
          tabIndex={-1}
          className="pb-[30px] pt-1 mb-0 flex gap-3 overflow-x-auto no-scrollbar cursor-text border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {tagPills.map((pill) => (
            <div
              key={pill.label}
              className="flex shrink-0 items-center gap-2 rounded-2xl border border-[#dddddd] bg-white px-4 py-3 text-sm font-medium cursor-text"
            >
              <img
                src={pill.icon}
                alt=""
                className="h-5 w-5 object-contain shrink-0 select-none pointer-events-none"
              />
              <span className="text-[#222222]">{pill.label}</span>
              <span className="text-[#717171] font-normal">{pill.count}</span>
            </div>
          ))}
        </div>

        {/* 6 Featured Reviews Grid */}
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:grid-cols-2 pb-10">
          {defaultReviews.map((rev) => {
            const isExpanded = expandedReviews[rev.id];

            return (
              <div key={rev.id}>
                <div className="flex items-center gap-3 mb-2.5">
                  {rev.authorAvatar ? (
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="h-[42px] w-[42px] rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="flex h-[42px] w-[42px] items-center justify-center rounded-full font-medium shrink-0 text-base"
                      style={{
                        backgroundColor: rev.bgColor || '#f4ece1',
                        color: '#222222',
                      }}
                    >
                      {rev.initial || rev.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-[15px] text-[#222222]">{rev.authorName}</p>
                    <p className="text-[13px] text-[#717171]">{rev.authorTenure}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#222222] mb-1.5">
                  <div className="flex gap-0.5" aria-hidden="true">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={10} fill="#222222" stroke="none" />
                    ))}
                  </div>
                  <span className="text-[#222222]">·</span>
                  <span className="font-semibold text-[#222222]">{rev.date}</span>
                </div>

                <p className={`text-[15px] text-[#222222] leading-[1.4] ${rev.hasShowMore && !isExpanded ? 'line-clamp-4' : ''}`}>
                  {rev.content}
                </p>

                {rev.hasShowMore && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(rev.id)}
                    className="font-medium underline text-[15px] text-[#222222] hover:text-black cursor-pointer block mt-2"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Show all 19 reviews button */}
        <button
          type="button"
          className="rounded-xl border border-[#222222] px-6 py-3 text-base font-medium text-[#222222] hover:bg-[#f7f7f7] transition-colors cursor-pointer h-[48px] inline-flex items-center justify-center"
        >
          Show all 19 reviews
        </button>
      </section>
    </>
  );
};
