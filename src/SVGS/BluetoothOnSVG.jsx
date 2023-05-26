import React from 'react';

const BluetoothOnSVG = ({
  className = '',
  onClick = () => console.log('Clicked'),
  ...otherProps
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`h-5 cursor-pointer ${className}`}
      onClick={onClick}
      {...otherProps}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17.9999L12 11.9999M12 11.9999V19.7928C12 20.2382 12.5386 20.4613 12.8536 20.1463L15.7929 17.207C16.1834 16.8165 16.1834 16.1833 15.7929 15.7928L12 11.9999ZM12 11.9999L15.7929 8.20698C16.1834 7.81646 16.1834 7.1833 15.7929 6.79277L12.8536 3.85343C12.5386 3.53845 12 3.76153 12 4.20698V11.9999ZM12 11.9999L6 5.99988"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BluetoothOnSVG;
