import React, { useEffect, useRef, useState } from "react";
import { programs } from "../../utilitiy/utillities";
import Button from "../../components/Button";
import PlaySVG from "../../SVGS/PlaySVG";
import QueueListSVG from "../../SVGS/QueueListSVG";
import { Link, useNavigate, useParams } from "react-router-dom";
import EllipsisHorizontalSVG from "../../SVGS/EllipsisHorizontalSVG";
import PopoverButton from "../../components/PopoverButton";
import ItemDetailModal from "../../components/modal/ItemDetailModal";
import MinusCircleSVG from "../../SVGS/MinusCircleSVG";
import SimpleModal from "../../components/modal/SimpleModal";
import HeartButton from "../../components/HeartButton";

const SinglePlaylist = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const program = programs.find((program) => {
    return program.id == id;
  });

  const [itemsDetailModal, setItemsDetailModal] = useState(
    new Array(programs.length).fill(false)
  );

  const [removeFromPlaylistModalIsOpen, setRemoveFromPlaylistModalIsOpen] =
    useState(false);

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
      <div className="text-white">
        {/* Main program */}
        <div className="header-gradient p-10 pb-3">
          <div className="flex flex-col md:max-full md:flex-row items-center">
            <div className="h-[100px] w-[120px] rounded-md bg-red-500" />
            <div className="flex flex-col mx-5 w-[60%]  justify-center">
              <h3 className="text-2xl font-medium mb-2">Playlist Name</h3>
              <p className="mb-4 text-base text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Provident reprehenderit numquam temporibus. Unde facilis
                distinctio perferendis. Earum accusamus adipisci reiciendis?
              </p>
            </div>
          </div>
          <p className="text-gray-500 mt-5">start &gt; Package</p>
        </div>

        {/* Icons */}
        <div className="flex gap-10 p-5">
          <PlaySVG className="bg-purple-500 p-1 rounded-full h-6" />

          <HeartButton />
          <PopoverButton
            button={<MinusCircleSVG className=" h-6" />}
            className="w-36"
          >
            <ul className="flex flex-col gap-3 p-2">
              <li
                className="text-xs cursor-pointer"
                onClick={() => setRemoveFromPlaylistModalIsOpen(true)}
              >
                Remove from Playlist
              </li>
            </ul>
          </PopoverButton>
        </div>

        {/* List */}
        <div className=" text-gray-300 uppercase grid grid-cols-12 gap-5 px-10">
          <section className="col-span-2 text-center">Category</section>
        </div>

        <main className="px-10">
          {programs.map((program, ind) => (
            <div
              className="grid grid-cols-12 my-5 border-t pt-5 border-gray-400"
              key={ind}
              id="list-item"
            >
              <section className="col-span-2  flex justify-center items-center">
                <div className="flex gap-7">
                  <HeartButton />
                  <PopoverButton button={<MinusCircleSVG />} className="w-44">
                    <ul className="flex flex-col gap-3 p-2">
                      <li className="flex gap-2 items-center cursor-pointer">
                        <QueueListSVG />
                        <p className="text-xs">Remove from playlist</p>
                      </li>
                    </ul>
                  </PopoverButton>
                </div>
              </section>

              <section className="col-span-10 mx-5">
                <div className="flex gap-10 items-center justify-between  w-full me-10">
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

        {/* Remove from playlist modal */}
        <SimpleModal
          isOpen={removeFromPlaylistModalIsOpen}
          onClose={() => setRemoveFromPlaylistModalIsOpen(false)}
          closeIconRequired={false}
          className="m-10"
        >
          <div className="flex flex-col gap-5 items-center">
            <h3 className="text-2xl font-medium">Delete Playlist</h3>
            <p className="text-sm text-center">
              Are you sure you want to delete this playlists?
            </p>
            <div className="mt-20">
              <Button
                className="my-2 w-full border border-gray-500 text-purple-500 px-5"
                onClick={() => navigate("/playlist")}
              >
                Yes, Delete it
              </Button>
              <Button
                className="my-2 w-full bg-purple-500 text-white px-5"
                onClick={() => setRemoveFromPlaylistModalIsOpen(false)}
              >
                No, Go Back
              </Button>
            </div>
          </div>
        </SimpleModal>
      </div>
    </>
  );
};

export default SinglePlaylist;
