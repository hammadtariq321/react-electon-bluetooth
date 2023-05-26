import React from "react";
import PopoverButton from "./PopoverButton";
import ChevronDownSVG from "../SVGS/ChevronDownSVG";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccountDetail = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <PopoverButton
      button={
        <span className=" bg-black rounded-md px-5 py-2 text-white">
          Ahsan Zulfiqar
          <ChevronDownSVG className="h-2.5 text-white mx-2 inline-block " />
        </span>
      }
      className="w-36"
    >
      <ul className="text-white text-xs text-start">
        <li
          className="py-2 px-3 hover:bg-gray-500 my-2 cursor-pointer"
          onClick={() => navigate("/setting")}
        >
          <span>{t("settings")}</span>
        </li>
        <li className="py-2 px-3 hover:bg-gray-500 my-2 cursor-pointer">
          <span>{t("account")}</span>
          {/* <span className="text-gray-400">Icon</span> */}
        </li>
        <li className="py-2 px-3 hover:bg-gray-500 my-2 cursor-pointer">
          <span>{t("logout")}</span>
        </li>
      </ul>
    </PopoverButton>
  );
};

export default AccountDetail;
