import React from "react";
import SimpleModal from "./SimpleModal";
import BellSVG from "../../SVGS/BellSVG";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <SimpleModal closeIconRequired={true} isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h1 className="text-4xl font-medium  text-white">{t("alert")}</h1>
        <p className="text-md font-normal text-white">
          {t("your-subscriptions-need")}
          <br />
          {t("your-attention")}
        </p>
        <div className=" mt-10 mb-20">
          <BellSVG className="h-14 m-auto" />
        </div>

        <Button
          className="text-sm rounded-2xl text-purple-500 border border-gray-500 w-40 mx-5"
          onClick={onClose}
        >
          {t("ignore")}
        </Button>
        <br />
        <Button className="text-sm rounded-2xl bg-purple-500 text-white w-40 m-5 my-3 mb-14">
          {t("see-subscription")}
        </Button>
      </div>
    </SimpleModal>
  );
};

export default SubscriptionModal;
