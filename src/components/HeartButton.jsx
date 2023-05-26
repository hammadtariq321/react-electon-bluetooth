import React, { useState } from "react";
import PopoverButton from "./PopoverButton";
import FillHeartSVG from "../SVGS/FillHeartSVG";
import HeartSVG from "../SVGS/HeartSVG";

const HeartButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <PopoverButton
      button={isFavorite ? <FillHeartSVG /> : <HeartSVG />}
      className="w-32"
    >
      <ul className="flex flex-col gap-3 p-2">
        {isFavorite ? (
          <li
            className="text-xs cursor-pointer"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            Remove Favourite
          </li>
        ) : (
          <li
            className="text-xs cursor-pointer"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            Add to Favourite
          </li>
        )}
      </ul>
    </PopoverButton>
  );
};

export default HeartButton;
