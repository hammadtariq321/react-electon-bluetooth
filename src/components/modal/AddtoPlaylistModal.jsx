import React, { useState } from "react";
import Button from "../Button";
import SimpleModal from "./SimpleModal";
import AddtoPlaylistIcon from "../AddtoPlaylistIcon";
import PlaylistModal from "./PlaylistModal";

const AddtoPlaylistModal = ({ isOpen, onClose }) => {
  const [createPlaylistModalIsOpen, setCreatePlaylistModalIsOpen] =
    useState(false);
  return (
    <>
      <SimpleModal
        isOpen={isOpen}
        onClose={onClose}
        closeIconRequired={false}
        className="m-12"
      >
        <h1 className="text-white text-xl text-center">Add to Playlist</h1>

        <div className="text-end my-5">
          <Button
            className="text-purple-500 text-xs border border-gray-500"
            onClick={() => {
              setCreatePlaylistModalIsOpen(!createPlaylistModalIsOpen);
              onClose();
            }}
          >
            Create New Playlist
          </Button>
        </div>
        <ul className="flex flex-col my-5 gap-3 max-h-60 overflow-auto">
          <li className="flex items-center justify-between" id="list-item">
            <div className="flex gap-3 items-center justify-center">
              <div className="bg bg-red-700  rounded-md h-6 w-6 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></div>
              <p>Playlist</p>
            </div>
            <AddtoPlaylistIcon />
          </li>
          <li className="flex items-center justify-between" id="list-item">
            <div className="flex gap-3 items-center justify-center">
              <div className="bg bg-red-700  rounded-md h-6 w-6 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></div>
              <p>Playlist</p>
            </div>
            <AddtoPlaylistIcon />
          </li>
          <li className="flex items-center justify-between" id="list-item">
            <div className="flex gap-3 items-center justify-center">
              <div className="bg bg-red-700  rounded-md h-6 w-6 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></div>
              <p>Playlist</p>
            </div>
            <AddtoPlaylistIcon />
          </li>
        </ul>

        <div className="text-center my-10">
          <Button
            className="bg-purple-500 w-72 text-white text-md"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </SimpleModal>

      {/*  */}
      <PlaylistModal
        isOpen={createPlaylistModalIsOpen}
        onClose={() => setCreatePlaylistModalIsOpen(false)}
      />
    </>
  );
};

export default AddtoPlaylistModal;
