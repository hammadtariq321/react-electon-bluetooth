import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GoBack from "../components/BackNext";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Modal from "../components/modal/Modal";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Modal>
      <GoBack className="mt-10" />
      <p className="text-xl font-medium text-center text-white">
        {t("create-account")}
      </p>
      <div className="text-white text-end mx-5 font-thin">
        <Button>{t("help")}</Button>
      </div>
      <form action="">
        <div className="m-5">
          <div className="">
            <InputField name={"firstName"} label={t("first-name")} />
            <InputField name={"lastName"} label={t("last-name")} />
            <InputField name={"email"} label={t("email")} />
            <InputField
              name={"password"}
              label={t("password")}
              hint={t("must-includes-letters-and-numbers")}
            />

            <Button
              className="text-purple-500 underline my-3 text-xs px-1"
              onClick={() => navigate("/signin")}
            >
              {t("already-have-account")} ?
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
                onClick={() => navigate("/verify-account")}
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

export default Signup;
