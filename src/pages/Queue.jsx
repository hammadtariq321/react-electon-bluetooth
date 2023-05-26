import React from "react";
import { Link } from "react-router-dom";
import EllipsisHorizontalSVG from "../SVGS/EllipsisHorizontalSVG";
import PlusCircleSVG from "../SVGS/PlusCircleSVG";
import QueueListSVG from "../SVGS/QueueListSVG";
import HeartButton from "../components/HeartButton";
import PopoverButton from "../components/PopoverButton";
import { programs } from "../utilitiy/utillities";

const Queue = () => {
  const program = programs[0];
  return (
    <div className="py-10 px-16">
      {/* List */}
      <h1 className="text-3xl text-white">Queue</h1>

      <h1 className="text-lg text-white mt-10">Now Playing</h1>
      <div className="grid grid-cols-12 my-5 border-t pt-5 border-gray-400">
        <section className="col-span-2 text-white flex justify-center items-center">
          <div className="flex gap-7">
            <HeartButton />
            <PopoverButton button={<PlusCircleSVG />} className="w-44">
              <ul className="flex flex-col gap-3 p-2">
                <li className="flex gap-2 items-center cursor-pointer">
                  <QueueListSVG />
                  <p className="text-xs">Add to queue</p>
                </li>

                <li className="flex gap-2  items-center cursor-pointer">
                  <PlusCircleSVG />
                  <p className="text-xs">Add to playlist</p>
                </li>
              </ul>
            </PopoverButton>
          </div>
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
                <span className="text-md font-medium">{program.program}</span>
                <span className="text-sm ms-2 font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur, tempora odio. Eaque alias animi dignissimos, voluptas
                  sint consectetur, saepe, vel facilis praesentium voluptate
                  recusandae in ab a aliquid? Totam, maxime!
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
                  // onClick={() => handleItemsDetailModal(ind)}
                >
                  <EllipsisHorizontalSVG />
                  <p className="text-xs">Read Details</p>
                </li>
              </ul>
            </PopoverButton>
          </div>
        </section>

        {/* Modal */}
        {/* <ItemDetailModal
                isOpen={itemsDetailModal[ind]}
                onClose={handleOnCloseCategoryModal}
              /> */}
      </div>

      <h1 className="text-lg text-white mt-10">Next in Queue</h1>

      <main>
        {programs.map((program, ind) => (
          <div
            className="grid grid-cols-12 my-5 border-t pt-5 border-gray-400"
            key={ind}
          >
            <section className="col-span-2 text-white flex justify-center items-center">
              <div className="flex gap-7">
                <HeartButton />
                <PopoverButton button={<PlusCircleSVG />} className="w-44">
                  <ul className="flex flex-col gap-3 p-2">
                    <li className="flex gap-2 items-center cursor-pointer">
                      <QueueListSVG />
                      <p className="text-xs">Add to queue</p>
                    </li>

                    <li className="flex gap-2  items-center cursor-pointer">
                      <PlusCircleSVG />
                      <p className="text-xs">Add to playlist</p>
                    </li>
                  </ul>
                </PopoverButton>
              </div>
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
                      {program.program}
                    </span>
                    <span className="text-sm ms-2 font-light">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tenetur, tempora odio. Eaque alias animi dignissimos,
                      voluptas sint consectetur, saepe, vel facilis praesentium
                      voluptate recusandae in ab a aliquid? Totam, maxime!
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
                      // onClick={() => handleItemsDetailModal(ind)}
                    >
                      <EllipsisHorizontalSVG />
                      <p className="text-xs">Read Details</p>
                    </li>
                  </ul>
                </PopoverButton>
              </div>
            </section>

            {/* Modal */}
            {/* <ItemDetailModal
                isOpen={itemsDetailModal[ind]}
                onClose={handleOnCloseCategoryModal}
              /> */}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Queue;
