import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Modal from "../components/modal/Modal";

const Signin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Modal>
      <p className="text-xl font-medium mt-10 text-center text-white">
        {t("login-account")}
      </p>
      <div className="text-white text-end mx-5 font-thin">
        <Button>{t("help")}</Button>
      </div>

      <form action="">
        <div className="m-5">
          <div className="">
            <InputField name={"email"} label={t("email")} />
            <InputField
              name={"password"}
              label={t("password")}
              hint={t("must-includes-letters-and-numbers")}
            />

            <Button
              className="text-purple-500 underline my-3 text-xs px-1"
              onClick={() => navigate("/signup")}
            >
              {t("create-account")} ?
            </Button>

            <div className="text-end my-2">
              <Button
                className={"text-purple-500 w-24 border-purple-500 mx-2 border"}
                onClick={() => navigate("/home")}
              >
                {t("skip")}
              </Button>
              <Button
                className={"bg-purple-500 w-24 text-white mx-2"}
                onClick={() => navigate("/bluetooth-setting")}
              >
                {t("next")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Signin;
