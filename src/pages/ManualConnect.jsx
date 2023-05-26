import React, { useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import img from "../assets/512x512.png";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal/Modal";
import BackNext from "../components/BackNext";
import { useTranslation } from "react-i18next";

const ManualConnect = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Modal>
      <BackNext className="mt-5" />
      <p className="text-xl font-medium text-center">{t("get-started")}</p>
      <p className="text-sm font-medium m-5">
        {t("where-to-find-the-serial-number-?")}
      </p>
      <div className="flex flex-wrap justify-center">
        <img src={img} className="w-20" alt="" />
      </div>

      <div className="m-5">
        <InputField name={"serialNumber"} label={t("serial-number")} />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
          voluptatum exercitationem dolor saepe quaerat cum.
        </p>
      </div>

      <div className="text-center m-10">
        <Button
          className={"bg-purple-500 w-36 text-white mx-2"}
          onClick={() => navigate("/home")}
        >
          {t("connect")}
        </Button>
      </div>
    </Modal>
  );
};

export default ManualConnect;
