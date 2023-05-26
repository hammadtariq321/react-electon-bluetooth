import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/modal/Modal";
import BackNext from "../components/BackNext";
import { useTranslation } from "react-i18next";

const BluetoothControls = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/manual-connect");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const { t } = useTranslation();
  return (
    <Modal>
      <BackNext className="mt-5" />
      <p className="text-xl font-medium text-center my-5">{t("get-started")}</p>
      <p className="text-center">
        {t("please-connect-your")}
        <br />
        {t("device-to-the-bluetooth")}
      </p>
      <div className="text-center mt-5">
        <Button className={"bg-purple-500 text-white"}>
          {t("bluetooth-setting")}
        </Button>
      </div>
    </Modal>
  );
};

export default BluetoothControls;
