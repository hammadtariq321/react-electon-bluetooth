import React from 'react';

const BluetoothOffSVG = ({
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
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 cursor-pointer ${className}`}
      onClick={onClick}
      {...otherProps}
    >
      <path
        d="M6 17.9999L12 11.9999M12 11.9999V19.7928C12 20.2383 12.5386 20.4614 12.8536 20.1464L16.5 16.4999M12 11.9999L16.5 16.4999M12 11.9999L6 5.99994M16.5 16.4999L19 18.9999M14.5 9.49994L15.7929 8.20705C16.1834 7.81652 16.1834 7.18336 15.7929 6.79283L12.8536 3.85349C12.5386 3.53851 12 3.76159 12 4.20705V6.99994"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BluetoothOffSVG;
