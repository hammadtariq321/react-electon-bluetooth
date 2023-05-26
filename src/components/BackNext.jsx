import React from "react";
import ChevronLeftSVG from "../SVGS/ChevronLeftSVG";
import ChevronRightSVG from "../SVGS/ChevronRightSVG";

const GoBack = ({ className = "" }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <ChevronLeftSVG />
      <ChevronRightSVG />
    </div>
  );
};

export default GoBack;
