import React, { useState } from "react";
import PlusCircleSVG from "../SVGS/PlusCircleSVG";
import CloseCircleSVG from "../SVGS/CloseCircleSVG";

const RemovePlaylistIcons = () => {
  const [isRemoved, setIsRemoved] = useState(false);
  return (
    <>
      {isRemoved ? (
        <PlusCircleSVG
          className="h-5 text-green-500"
          onClick={() => setIsRemoved(!isRemoved)}
        />
      ) : (
        <CloseCircleSVG
          className="h-5"
          onClick={() => setIsRemoved(!isRemoved)}
        />
      )}
    </>
  );
};

export default RemovePlaylistIcons;
