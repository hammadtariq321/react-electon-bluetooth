import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import EllipsisHorizontalSVG from "../../SVGS/EllipsisHorizontalSVG";
import FillHeartSVG from "../../SVGS/FillHeartSVG";
import PlaySVG from "../../SVGS/PlaySVG";
import PlusCircleSVG from "../../SVGS/PlusCircleSVG";
import QueueListSVG from "../../SVGS/QueueListSVG";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import PopoverButton from "../../components/PopoverButton";
import { myToaster, programs } from "../../utilitiy/utillities";

const Index = () => {
  const [favouritePrograms, setFavouritePrograms] = useState(programs);

  const handleFavourtiePrograms = (id) => {
    myToaster("Removed from Favourites");
    const newPrograms = favouritePrograms.filter(
      (program) => program.id !== id
    );
    setFavouritePrograms(newPrograms);
  };
  const [itemsDetailModal, setItemsDetailModal] = useState(
    new Array(programs.length).fill(false)
  );

  const handleItemsDetailModal = (index) => {
    const itemsDetailModaldal = itemsDetailModal.map(
      (state, i) => !state && i === index
    );
    setItemsDetailModal(itemsDetailModaldal);
  };
  const handleOnCloseCategoryModal = () => {
    const itemsDetailModaldal = Array(itemsDetailModal.length).fill(false);
    setItemsDetailModal(itemsDetailModaldal);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Heading>{t("my-programs")}</Heading>
      <div className="mt-8 text-gray-300 uppercase text-lg grid grid-cols-12 gap-5">
        <section className="col-span-2"></section>
        <section className="col-span-10">{t("program")}</section>
      </div>
      <main>
        {favouritePrograms.map((program, ind) => (
          <div
            className="grid grid-cols-12 m-5 border-t pt-3 border-gray-400"
            key={ind}
            id="list-item"
          >
            <section className="col-span-2 text-white flex justify-center items-center">
              {program.isSubscribe ? (
                <div className="flex gap-7">
                  <PlaySVG className="bg-purple-200 rounded-xl text-purple-500 p-1" />
                  <FillHeartSVG
                    onClick={() => handleFavourtiePrograms(program.id)}
                  />
                  <PopoverButton button={<PlusCircleSVG />} className="w-44">
                    <ul className="flex flex-col gap-3 p-2">
                      <li>
                        <Link to="" className="flex gap-4 items-center">
                          <QueueListSVG />
                          <p className="text-xs">Add to queue</p>
                        </Link>
                      </li>
                      {/* {!program.isSubscribe && ( */}
                      <li>
                        <Link to="" className="flex gap-4 items-center">
                          <PlusCircleSVG />
                          <p className="text-xs">Add to playlist</p>
                        </Link>
                      </li>
                      {/* )} */}
                    </ul>
                  </PopoverButton>
                </div>
              ) : (
                <Button
                  className={
                    "text-white text-[8px] bg-purple-500 px-1 py-0 m-0"
                  }
                  // onClick={() => navigate('/package')}
                >
                  Subscribe
                </Button>
              )}
            </section>

            <section className="col-span-10 mx-5">
              <div className="flex gap-2 items-center justify-between text-white w-full me-10">
                <Link className="flex gap-3" to={`/package/${program.id}`}>
                  <img
                    className="w-16 h-16 object-cover "
                    src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                    alt=""
                  />
                  <div>
                    <h3 className="text-md font-medium">{program.program}</h3>
                    <p className="text-x font-light">{program.desc}</p>
                  </div>
                </Link>

                <PopoverButton
                  button={<EllipsisHorizontalSVG />}
                  className={"w-44"}
                >
                  <ul className="flex flex-col gap-3 p-2">
                    <li
                      className="flex gap-4 items-center cursor-pointer"
                      onClick={() => handleItemsDetailModal(ind)}
                    >
                      <EllipsisHorizontalSVG />
                      <p className="text-xs">Read Details</p>
                    </li>
                  </ul>
                </PopoverButton>
              </div>
            </section>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Index;
