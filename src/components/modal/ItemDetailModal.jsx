import React, { useState } from "react";
import "./Modal.css";
import PlaySVG from "../../SVGS/PlaySVG";
import Button from "../Button";
import PlusCircleSVG from "../../SVGS/PlusCircleSVG";
import EllipsisHorizontalSVG from "../../SVGS/EllipsisHorizontalSVG";
import CloseCircleSVG from "../../SVGS/CloseCircleSVG";
import PlayButtonModal from "./PlayButtonModal";
import HeartButton from "../HeartButton";

const ItemDetailModal = ({ isOpen, onClose }) => {
  const [playButtonModalIsOpen, setPlayButtonModalIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster bg-black"
          style={{ background: "rgba(0,0,0,.7)" }}
        >
          <div className="modal-container bg-black  md:w-[450px] max-w-lg mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6 text-white">
              {/* Header */}
              <div className="flex justify-end items-center m-5">
                <CloseCircleSVG onClick={() => onClose()} />
              </div>
              {/* Body */}
              <div className="flex flex-grow gap-5 my-5 flex-col justify-center items-center">
                <div>
                  <img
                    className="h-[140px] w-[130px]"
                    src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                    alt=""
                  />
                </div>

                {/* Icons */}
                <div className="flex gap-10 items-center">
                  {true ? (
                    <PlaySVG
                      className="bg-purple-500 p-1 rounded-full"
                      onClick={() => {
                        setPlayButtonModalIsOpen(true);
                        onClose();
                      }}
                    />
                  ) : (
                    <Button className="text-white text-md bg-purple-500 px-1 py-0 m-0">
                      Subscribe
                    </Button>
                  )}
                  <HeartButton />
                  <PlusCircleSVG />
                  <EllipsisHorizontalSVG />
                </div>

                {/* Des */}
                <div className="flex flex-col gap-3 mx-5 w-[60%] text-white text-center">
                  <h3 className="text-2xl font-normal">Hello</h3>
                  <p className="text-sm text-justify">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident reprehenderit numquam temporibus. Unde facilis
                    distinctio perferendis. Earum accusamus adipisci reiciendis?
                  </p>
                  <p className="text-xs text-justify">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident reprehenderit numquam temporibus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PlayButton Modal */}
      <PlayButtonModal
        name="Package"
        isOpen={playButtonModalIsOpen}
        onClose={() => setPlayButtonModalIsOpen(!playButtonModalIsOpen)}
      />
    </>
  );
};

export default ItemDetailModal;
