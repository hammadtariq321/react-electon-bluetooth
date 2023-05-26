import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal/Modal";
import BackNext from "../components/BackNext";
import { useTranslation } from "react-i18next";

const AccountVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/bluetooth-setting");
    }, 3000);
  }, []);

  const { t } = useTranslation();
  return (
    <Modal>
      <BackNext className="mt-5" />
      <p className="text-2xl font-medium my-5 text-center">
        {t("welcome")}
        <br />
        {t("to-nexi")}
      </p>
      <p className="text-center mt-10">
        {t("please-verify")}
        <br />
        {t("account-in-your-email")}.
      </p>
    </Modal>
  );
};

export default AccountVerification;
