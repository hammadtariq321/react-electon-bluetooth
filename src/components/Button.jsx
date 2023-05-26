import React from 'react';

const Button = ({
  className,
  children,
  icon,
  onClick = () => console.log('clicked'),
  ...otherProps
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={`rounded-full px-3 py-1.5 relative overflow-hidden transform transition duration-300 ease-in-out hover:scale-110 ${className}`}
      {...otherProps}
    >
      <div className="flex justify-center items-center gap-2">
        {icon && icon}
        {children}
      </div>
    </button>
  );
};

export default Button;
