import React, { useState } from "react";
import BatterySVG from "../SVGS/BatterySVG";
import BluetoothOnSVG from "../SVGS/BluetoothOnSVG";
import QueueListSVG from "../SVGS/QueueListSVG";
import BluetoothSettingModal from "./modal/BluetoothSettingModal";
import BatteryAlertModal from "./modal/BatteryAlertModal";
import PauseCircleSVG from "../SVGS/PauseCircleSVG";
import Range from "./Range";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const [isBluetoothSettingModalOpen, setIsBluetoothSettingModalOpen] =
    useState(false);

  const [isBatteryModalIsOpen, setIsBatteryModalIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 bg-primary w-full px-20 h-[4rem] p-2 flex justify-between items-center">
        <div className="w-32">
          <h1 className="text-white text-sm font-medium">Program 1</h1>
          <p className="text-white text-xs font-normal">
            Lorem ipsum dolor sit amet...
          </p>
        </div>
        <div className="text-center">
          <PauseCircleSVG className="text-white mb-1 mx-auto" />
          <div className="flex items-center text-white gap-2 text-xs">
            <span>1:10</span>
            <Range />
            <span>3:00</span>
          </div>
        </div>
        <div className="text-white flex gap-5">
          <BatterySVG
            onClick={() => setIsBatteryModalIsOpen(!isBatteryModalIsOpen)}
          />
          <BluetoothOnSVG
            onClick={() =>
              setIsBluetoothSettingModalOpen(!isBluetoothSettingModalOpen)
            }
          />
          <QueueListSVG onClick={() => navigate("/queue")} />
        </div>
      </div>

      {/* Modals */}
      <BluetoothSettingModal
        isOpen={isBluetoothSettingModalOpen}
        onClose={() => setIsBluetoothSettingModalOpen(false)}
      />

      <BatteryAlertModal
        isOpen={isBatteryModalIsOpen}
        onClose={() => setIsBatteryModalIsOpen(false)}
      />
    </>
  );
};

export default Footer;
