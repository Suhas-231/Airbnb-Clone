import React from 'react';

interface LaurelProps {
  className?: string;
  size?: number;
}

export const LaurelLeft: React.FC<LaurelProps> = ({ className = 'text-[#222222]', size = 32 }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 32 48"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 4c-1.5 3-4 5-7 6 3 2 4.5 4.5 5 7.5-2-1-4.5-1.5-7.5-1 2 3 2.5 6 2 9-2.5-1.5-5.5-1.5-8.5-.5 1.5 3.5 1.5 7 0 10-2-1-4.5-1.5-7-1 1 3.5.5 7-1.5 10 3.5-.5 7-2 10-4.5 3-2.5 5.5-5.5 7-9 2-4.5 2.5-9.5 2-14.5-.5-4-2-7.5-4.5-10.5z" />
    <path d="M12 42c-2 1.5-4.5 2.5-7 3 1.5-2.5 2.5-5 2.5-8 1.5 1.5 3 3.5 4.5 5z" opacity="0.8" />
  </svg>
);

export const LaurelRight: React.FC<LaurelProps> = ({ className = 'text-[#222222]', size = 32 }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 32 48"
    fill="currentColor"
    className={className}
    style={{ transform: 'scaleX(-1)' }}
    aria-hidden="true"
  >
    <path d="M22 4c-1.5 3-4 5-7 6 3 2 4.5 4.5 5 7.5-2-1-4.5-1.5-7.5-1 2 3 2.5 6 2 9-2.5-1.5-5.5-1.5-8.5-.5 1.5 3.5 1.5 7 0 10-2-1-4.5-1.5-7-1 1 3.5.5 7-1.5 10 3.5-.5 7-2 10-4.5 3-2.5 5.5-5.5 7-9 2-4.5 2.5-9.5 2-14.5-.5-4-2-7.5-4.5-10.5z" />
    <path d="M12 42c-2 1.5-4.5 2.5-7 3 1.5-2.5 2.5-5 2.5-8 1.5 1.5 3 3.5 4.5 5z" opacity="0.8" />
  </svg>
);
