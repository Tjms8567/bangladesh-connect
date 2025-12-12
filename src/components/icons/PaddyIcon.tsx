import React from 'react';

interface PaddyIconProps {
  className?: string;
  size?: number;
}

export const PaddyIcon: React.FC<PaddyIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main stem */}
      <path d="M12 22V8" />
      
      {/* Left grains */}
      <ellipse cx="8" cy="6" rx="1.5" ry="3" transform="rotate(-30 8 6)" />
      <ellipse cx="6" cy="8" rx="1.5" ry="3" transform="rotate(-45 6 8)" />
      <ellipse cx="5" cy="11" rx="1.5" ry="3" transform="rotate(-60 5 11)" />
      
      {/* Right grains */}
      <ellipse cx="16" cy="6" rx="1.5" ry="3" transform="rotate(30 16 6)" />
      <ellipse cx="18" cy="8" rx="1.5" ry="3" transform="rotate(45 18 8)" />
      <ellipse cx="19" cy="11" rx="1.5" ry="3" transform="rotate(60 19 11)" />
      
      {/* Top center grains */}
      <ellipse cx="10" cy="4" rx="1.2" ry="2.5" transform="rotate(-15 10 4)" />
      <ellipse cx="14" cy="4" rx="1.2" ry="2.5" transform="rotate(15 14 4)" />
      <ellipse cx="12" cy="3" rx="1" ry="2" />
      
      {/* Lower side grains */}
      <ellipse cx="7" cy="14" rx="1.2" ry="2.5" transform="rotate(-75 7 14)" />
      <ellipse cx="17" cy="14" rx="1.2" ry="2.5" transform="rotate(75 17 14)" />
    </svg>
  );
};

export default PaddyIcon;
