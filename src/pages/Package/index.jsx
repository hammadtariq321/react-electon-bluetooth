import React, { useEffect, useRef, useState } from "react";
import { programs } from "../../utilitiy/utillities";
import Button from "../../components/Button";
import PlusCircleSVG from "../../SVGS/PlusCircleSVG";
import PlaySVG from "../../SVGS/PlaySVG";
import QueueListSVG from "../../SVGS/QueueListSVG";
import { Link, useParams } from "react-router-dom";
import EllipsisHorizontalSVG from "../../SVGS/EllipsisHorizontalSVG";
import { ItemDetails } from "../../components/ItemDetails";
import PopoverButton from "../../components/PopoverButton";
import ItemDetailModal from "../../components/modal/ItemDetailModal";
import HeartButton from "../../components/HeartButton";

const Index = () => {
  const { id } = useParams();
  const program = programs.find((program) => program.id == id);

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

  return (
    <>
      <div className="m-10">
        {/* Main program */}
        <ItemDetails data={program} itemName={program.package} />

        {/* List */}
        <div className="mt-10 text-gray-300 uppercase grid grid-cols-12 gap-5 ">
          <section className="col-span-2 text-center">category</section>
        </div>

        <main>
          {programs.map((program, ind) => (
            <div
              className="grid grid-cols-12 my-5 border-t pt-5 border-gray-400"
              key={ind}
              id="list-item"
            >
              <section className="col-span-2 text-white flex justify-center items-center">
                {program.isSubscribe ? (
                  <div className="flex gap-7">
                    <PlaySVG className="bg-purple-200 rounded-xl text-purple-500 p-1" />
                    <HeartButton />
                    <PopoverButton button={<PlusCircleSVG />} className="w-44">
                      <ul className="flex flex-col gap-3 p-2">
                        <li className="flex gap-2 items-center cursor-pointer">
                          <QueueListSVG />
                          <p className="text-xs">Add to queue</p>
                        </li>
                        {/* {!program.isSubscribe && ( */}
                        <li className="flex gap-2  items-center cursor-pointer">
                          <PlusCircleSVG />
                          <p className="text-xs">Add to playlist</p>
                        </li>
                        {/* )} */}
                      </ul>
                    </PopoverButton>
                  </div>
                ) : (
                  <Button
                    className={"text-white text-xs bg-purple-500 px-1 py-0 m-0"}
                    // onClick={() => navigate('/package')}
                  >
                    Subscribe
                  </Button>
                )}
              </section>

              <section className="col-span-10 mx-5">
                <div className="flex gap-10 items-center justify-between text-white w-full me-10">
                  <Link className="flex gap-3" to={`/category/${program.id}`}>
                    <img
                      width={150}
                      className="h-20 object-cover "
                      src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                      alt=""
                    />
                    <div className="text-justify">
                      <span className="text-md font-medium">
                        {program.category}
                      </span>
                      <span className="text-sm ms-2 font-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur, tempora odio. Eaque alias animi dignissimos,
                        voluptas sint consectetur, saepe, vel facilis
                        praesentium voluptate recusandae in ab a aliquid? Totam,
                        maxime!
                      </span>
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

              {/* Modal */}
              <ItemDetailModal
                isOpen={itemsDetailModal[ind]}
                onClose={handleOnCloseCategoryModal}
              />
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Index;
