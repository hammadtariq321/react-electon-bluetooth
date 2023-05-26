import React, { useState } from "react";
import SimpleModal from "./SimpleModal";
import Button from "../Button";
import PlaySVG from "../../SVGS/PlaySVG";
import Range from "../Range";

const PlayButtonModal = ({ isOpen, onClose, name }) => {
  const [value, setValue] = useState(30);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <SimpleModal isOpen={isOpen} onClose={onClose}>
      <div className="text-white text-center mx-10 ">
        <h1 className="text-2xl font-normal">{name}</h1>
        <p className="text-sm text-justify text-gray-300 my-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse quaerat
          accusamus ut. Doloribus corrupti id voluptates, laudantium distinctio
          ea nobis!
        </p>

        <Range onChange={handleChange} />

        <Button
          icon={<PlaySVG />}
          className="text-white text-md bg-purple-500 p-2 w-52 my-10"
        >
          {value} Min
        </Button>
      </div>
    </SimpleModal>
  );
};

export default PlayButtonModal;
