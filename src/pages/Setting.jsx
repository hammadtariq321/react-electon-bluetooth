import React from "react";
import { useTranslation } from "react-i18next";
import AccountDetail from "../components/AccountDetail";
import Button from "../components/Button";
import ToggleButton from "../components/ToggleButton";

const Setting = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="p-5">
      <div className="text-end">
        <AccountDetail />
      </div>

      <h1 className="text-2xl font-bold text-white">{t("setting")}</h1>

      <div className="flex justify-center mt-10">
        <ul className="w-[50%]">
          <li className="text-white font-bold text-xl my-5">
            {t("connection")}
          </li>
          <li className="flex justify-between items-center text-white my-5 text-sm">
            <span className="text-gray-200">{t("bluetooth-status")}</span>
            <span className="text-lg font-medium">{t("good")}</span>
          </li>
          <li className="flex justify-between items-center text-white my-5 text-sm">
            <span className="text-gray-200">{t("nexi-connection")}</span>
            <span>
              <ToggleButton label="Disconnect" />
            </span>
          </li>

          <li className="text-white font-bold text-xl my-5">{t("language")}</li>
          <li className="flex justify-between items-center text-white my-5 text-sm">
            <span className="text-gray-200">{t("choose-language")}</span>

            <select
              data-te-select-init
              className="w-36 bg-black rounded-lg p-2 outline-none hover:cursor-pointer gap-5"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="de">Germany</option>
              <option value="ko">Korean</option>
            </select>
          </li>

          <li className="text-white font-bold text-xl my-5">
            {t("nexi-device")}
          </li>
          <li className="flex justify-between items-center text-white my-5 text-sm">
            <span className="text-gray-200">{t("battery-status-of-nexi")}</span>
            <span className="text-lg font-bold">80%</span>
          </li>
          <li className="flex justify-between items-center text-white my-5 text-sm">
            <span className="text-gray-200">{t("firmware-upgrade")}</span>
            <Button
              className={
                "bg-purple-500 text-xs text-white px-5 py-2 rounded-full"
              }
            >
              {t("check-for-upgrades")}
            </Button>
          </li>
          <li className="flex justify-between items-center text-white my-5 text-sm">
            <span className="text-gray-200">{t("firmware-upgrade")}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Setting;
