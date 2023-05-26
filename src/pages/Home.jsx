import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { programs } from "../utilitiy/utillities";
import Heading from "../components/Heading";
import CardForList from "../components/Cards/CardForList";
import Button from "../components/Button";
import SubscriptionModal from "../components/modal/SubscriptionModal";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);

  const { t } = useTranslation();
  return (
    <>
      {/* Subscription */}
      <div className="flex items-center justify-between bg-black w-[70%] p-5 rounded-lg absolute top-16 right-20">
        <p className="text-md font-normal text-white">
          {t("your-subscriptions-need")}
          <br />
          {t("your-attention")}
        </p>
        <div>
          <Button
            onClick={() => setNotificationModalIsOpen(!notificationModalIsOpen)}
            type="button"
            className="text-sm rounded-2xl bg-purple-500 text-white px-20"
          >
            {t("see-subscription")}
          </Button>
        </div>
      </div>

      <Heading>{t("home")}</Heading>

      {/* My Programs */}
      <div className="m-5">
        <div className="flex justify-between mx-2">
          <p className="font-medium text-xl text-white">{t("my-programs")}</p>
          <div>
            <button
              onClick={() => navigate("/list")}
              type="button"
              className="text-purple-500 text-sm"
            >
              {t("view-all")}
            </button>
          </div>
        </div>
        <ul className="m-3 flex gap-3">
          {programs.map(({ id, imageURL, desc }) => (
            <li className="" key={id}>
              <CardForList imgURL={imageURL} desc={desc} />
            </li>
          ))}
        </ul>
      </div>

      {/* Recomendations */}
      <div className="m-3">
        <div className="flex justify-between mx-2">
          <p className="font-medium text-xl text-white">{t("recommended")}</p>
          <div>
            <button
              onClick={() => navigate("/list")}
              type="button"
              className="text-purple-500 text-sm"
            >
              {t("view-all")}
            </button>
          </div>
        </div>
        <ul className="m-3 flex gap-3 overflow-auto scrollbar-hidden">
          {programs.map(({ id, imageURL, desc }) => (
            <li className="" key={id}>
              <CardForList imgURL={imageURL} desc={desc} />
            </li>
          ))}
        </ul>
      </div>

      {/* Pakages*/}
      <div className="m-3">
        <div className="flex justify-between mx-2">
          <p className="font-medium text-xl text-white">{t("packages")}</p>
          <div>
            <button
              onClick={() => navigate("/list")}
              type="button"
              className="text-purple-500 text-sm"
            >
              {t("view-all")}
            </button>
          </div>
        </div>
        <ul className="m-3 flex gap-3 overflow-auto scrollbar-hidden">
          {programs.map(({ id, imageURL, desc }) => (
            <li
              className=""
              onClick={() => navigate(`/package/${id}`)}
              key={id}
            >
              <CardForList imgURL={imageURL} desc={desc} />
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <SubscriptionModal
        isOpen={notificationModalIsOpen}
        onClose={() => setNotificationModalIsOpen(!notificationModalIsOpen)}
      />
    </>
  );
};

export default Home;
