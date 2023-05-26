import React from "react";
import SimpleModal from "./SimpleModal";
import Button from "../Button";
import BatterySVG from "../../SVGS/BatterySVG";

const BatteryAlertModal = ({ isOpen, onClose }) => {
  return (
    <SimpleModal
      className="p-10"
      closeIconRequired={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="text-center">
        <h1 className="text-3xl font-medium  text-white">
          Battery on Nexi is Low
        </h1>
        <p className="text-md font-normal text-white">
          Your Nexi
          <br />
          need your attention
        </p>
        <div className=" mt-10 mb-20">
          <BatterySVG className="m-auto text-white h-16" />
        </div>

        <Button
          className="text-sm rounded-2xl text-purple-500 border border-gray-500 w-40 mx-5"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </SimpleModal>
  );
};

export default BatteryAlertModal;
