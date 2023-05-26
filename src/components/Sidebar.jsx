import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import HeartSVG from "../SVGS/HeartSVG";
import HomeSVG from "../SVGS/HomeSVG";
import LibrarySVG from "../SVGS/LibrarySVG";
import PlusCircleSVG from "../SVGS/PlusCircleSVG";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <>
      <ul className="p-5 mt-10 flex flex-col gap-5">
        <li>
          <NavLink
            className={"flex items-center cursor-pointer gap-2 text-white"}
            to="/home"
          >
            <HomeSVG id="active" />
            <p className="text-md font-normal">{t("home")}</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={"flex items-center cursor-pointer gap-2 text-white"}
            to="/favourite"
          >
            <HeartSVG id="active" />
            <p className="text-md font-normal">{t("favourites")}</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={"flex items-center cursor-pointer gap-2 text-white"}
            to="/playlist"
          >
            <LibrarySVG id="active" />
            <p className="text-md font-normal">{t("your-library")}</p>
          </NavLink>
        </li>
      </ul>

      <h3 className="text-lg font-light mt-5 text-gray-300 px-5">
        {t("playlists")}
      </h3>
      <ul className="p-5 flex flex-col gap-3">
        <li className=" text-gray-300 cursor-pointer">
          <p className="text-sm font-normal">{t("playlist-is-empty")}</p>
        </li>
      </ul>

      <div className="header-gradient absolute bottom-0 p-5 text-white w-full">
        <div className="flex gap-3 cursor-pointer">
          <PlusCircleSVG />
          <p className="text-sm font-normal">{t("create-playlist")}</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
