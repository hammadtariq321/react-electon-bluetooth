import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButtonSVG({ className = '', ...otherProps }) {
  const navigate = useNavigate();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`h-5 cursor-pointer ${className}`}
      onClick={() => navigate(-1)}
      {...otherProps}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
}

export default BackButtonSVG;
