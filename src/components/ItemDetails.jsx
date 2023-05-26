import React, { useState } from "react";
import EllipsisHorizontalSVG from "../SVGS/EllipsisHorizontalSVG";
import PlaySVG from "../SVGS/PlaySVG";
import Button from "./Button";
import PlusCircleSVG from "../SVGS/PlusCircleSVG";
import PopoverButton from "./PopoverButton";
import QueueListSVG from "../SVGS/QueueListSVG";
import MinusCircleSVG from "../SVGS/MinusCircleSVG";
import PlayButtonModal from "./modal/PlayButtonModal";
import PlaylistModal from "./modal/PlaylistModal";
import AddtoPlaylistModal from "./modal/AddtoPlaylistModal";
import RemoveFromPlaylistModal from "./modal/RemoveFromPlaylistModal";
import HeartButton from "./HeartButton";
// import audioFile from '../../../assets/audios/audio1.mp3';

export const ItemDetails = ({ data, itemName = "Package" }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playButtonModalIsOpen, setPlayButtonModalIsOpen] = useState(false);

  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  const [addtoPlaylistModalIsOpen, setAddtoPlaylistModalIsOpen] =
    useState(false);
  const [createNewPlaylistModalIsOpen, setCreateNewPlaylistModalIsOpen] =
    useState(false);

  const [editPlaylistModalIsOpen, setEditPlaylistModalIsOpen] = useState(false);

  const [removeFromPlaylistModalIsOpen, setRemoveFromPlaylistModalIsOpen] =
    useState(false);

  const inPlaylist = false;

  // const [audio] = useState(new Audio(audioFile));
  // const handleAudio = () => {
  //   if (audio.paused) {
  //     audio.play();
  //   } else {
  //     audio.pause();
  //   }
  // };

  return (
    <div className="flex justify-between">
      {/* <div>
        <audio src={audioFile} />
        <button onClick={handleAudio}>Play/Pause</button>
      </div> */}

      <div className="flex flex-col md:max-full md:flex-row">
        <img
          className="h-[140px] w-[130px]"
          src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
          alt=""
        />
        <div className="flex flex-col mx-5 w-[60%] text-white">
          <h3 className="text-2xl font-medium mb-2">{itemName}</h3>
          <p className="mb-4 text-base text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            reprehenderit numquam temporibus. Unde facilis distinctio
            perferendis. Earum accusamus adipisci reiciendis?
          </p>

          <div className="flex gap-5 items-center">
            {data.isSubscribe ? (
              <PlaySVG
                className="bg-purple-500 p-1 rounded-full"
                onClick={() => setPlayButtonModalIsOpen(!playButtonModalIsOpen)}
              />
            ) : (
              <Button className="text-white text-md bg-purple-500 px-1 py-0 m-0">
                Subscribe
              </Button>
            )}

            {/* Heart Button */}
            <HeartButton />

            {/* Plus circle */}
            <PopoverButton
              button={inPlaylist ? <MinusCircleSVG /> : <PlusCircleSVG />}
              className="w-36"
            >
              <ul className="flex flex-col gap-3 p-2">
                {!inPlaylist ? (
                  <>
                    <li
                      className="text-xs cursor-pointer"
                      onClick={() =>
                        setAddtoPlaylistModalIsOpen(!addtoPlaylistModalIsOpen)
                      }
                    >
                      Add to Playlist
                    </li>
                    <li
                      className="text-xs cursor-pointer"
                      onClick={() =>
                        setCreateNewPlaylistModalIsOpen(
                          !createNewPlaylistModalIsOpen
                        )
                      }
                    >
                      Create Playlist
                    </li>
                  </>
                ) : (
                  <li
                    className="text-xs cursor-pointer"
                    onClick={() =>
                      setRemoveFromPlaylistModalIsOpen(
                        !removeFromPlaylistModalIsOpen
                      )
                    }
                  >
                    Remove from Playlist
                  </li>
                )}
              </ul>
            </PopoverButton>

            {/* Elipsis Icon */}
            <PopoverButton
              button={<EllipsisHorizontalSVG />}
              className={"w-40"}
            >
              <ul className="flex flex-col gap-3 p-2">
                {data.isSubscribe && (
                  <li className="flex gap-2 items-center cursor-pointer">
                    <QueueListSVG />
                    <p className="text-xs">Add to queue</p>
                  </li>
                )}
                <li
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                >
                  <EllipsisHorizontalSVG />
                  <p className="text-xs">Read Details</p>
                </li>
              </ul>
            </PopoverButton>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* <ItemDetailModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(!modalIsOpen)}
      /> */}

      {/* PlayButton Modal */}
      <PlayButtonModal
        name={itemName}
        isOpen={playButtonModalIsOpen}
        onClose={() => setPlayButtonModalIsOpen(!playButtonModalIsOpen)}
      />

      {/* Playlist */}
      <AddtoPlaylistModal
        isOpen={addtoPlaylistModalIsOpen}
        onClose={() => setAddtoPlaylistModalIsOpen(!addtoPlaylistModalIsOpen)}
        closeIconRequired={false}
        className="m-12"
      />

      {/* Create New Playlist Modal */}
      <PlaylistModal
        isOpen={createNewPlaylistModalIsOpen}
        onClose={() =>
          setCreateNewPlaylistModalIsOpen(!createNewPlaylistModalIsOpen)
        }
      />
      <PlaylistModal
        isOpen={editPlaylistModalIsOpen}
        onClose={() => setEditPlaylistModalIsOpen(!editPlaylistModalIsOpen)}
        heading="Edit Playlist"
      />

      <RemoveFromPlaylistModal
        isOpen={removeFromPlaylistModalIsOpen}
        onClose={() =>
          setRemoveFromPlaylistModalIsOpen(!removeFromPlaylistModalIsOpen)
        }
      />
    </div>
  );
};
