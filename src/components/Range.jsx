import React from 'react';

const Range = ({
  min = 0,
  max = 100,
  value = 50,
  onChange = (evt) => console.log(evt.target.value),
}) => {
  return (
    <input
      className="accent-purple-500 h-1 cursor-pointer rounded w-80  transition-all duration-450 ease-in"
      type="range"
      min={min}
      max={max}
      // value={value}
      onChange={onChange}
    />
  );
};

export default Range;
