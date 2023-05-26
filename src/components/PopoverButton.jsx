import { useEffect, useRef, useState } from 'react';

const PopoverButton = ({ button, children, className = '', ...otherProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopoverButton = () => setIsOpen((isOpen) => !isOpen);

  const PopoverButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      PopoverButtonRef.current &&
      !PopoverButtonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-40" {...otherProps}>
      <span className="cursor-pointer" onClick={togglePopoverButton}>
        {button}
      </span>
      {isOpen && (
        <div
          ref={PopoverButtonRef}
          className={`transition-all duration-300 ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } bg-black absolute right-0 top-full mt-2 rounded-lg shadow-lg ${className}`}
        >
          <div className="p-1.5" onClick={togglePopoverButton}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopoverButton;
