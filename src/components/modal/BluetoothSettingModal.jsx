import React from "react";
import SimpleModal from "./SimpleModal";
import Button from "../Button";
import BluetoothOffSVG from "../../SVGS/BluetoothOffSVG";

const BluetoothSettingModal = ({ isOpen, onClose }) => {
  return (
    <SimpleModal closeIconRequired={true} isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h1 className="text-3xl font-medium  text-white">
          Bluetooth is disconnected
        </h1>
        <p className="text-md font-normal text-white">
          Your subscriptions
          <br />
          need your attention
        </p>
        <div className=" mt-10 mb-20">
          <BluetoothOffSVG className="h-14 m-auto text-white" />
        </div>

        <Button
          className="text-sm rounded-2xl text-purple-500 border border-gray-500 w-40 mx-5"
          onClick={onClose}
        >
          Ignore
        </Button>
        <br />
        <Button className="text-sm rounded-2xl bg-purple-500 text-white w-40 m-5 my-3 mb-14">
          Bluetooth Setting
        </Button>
      </div>
    </SimpleModal>
  );
};

export default BluetoothSettingModal;
