import React, { useState } from "react";
import CheckCircle from "../SVGS/CheckCircle";
import PencilSVG from "../SVGS/PencilSVG";
import PlusCircleSVG from "../SVGS/PlusCircleSVG";
import PlaylistModal from "./modal/PlaylistModal";

const AddtoPlaylistIcon = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [editPlaylistModalIsOpen, setEditPlaylistModalIsOpen] = useState(false);
  return (
    <>
      <div className="flex gap-5">
        <PencilSVG
          className="h-3.5 text-purple-500"
          onClick={() => {
            setEditPlaylistModalIsOpen(!editPlaylistModalIsOpen);
          }}
        />
        {isChecked ? (
          <CheckCircle
            className="h-3.5 text-green-500"
            onClick={() => setIsChecked(!isChecked)}
          />
        ) : (
          <PlusCircleSVG
            className="h-3.5 text-purple-500"
            onClick={() => setIsChecked(!isChecked)}
          />
        )}
      </div>

      {/*  */}
      <PlaylistModal
        onClose={() => setEditPlaylistModalIsOpen(false)}
        isOpen={editPlaylistModalIsOpen}
        heading="Edit Playlist"
      />
    </>
  );
};

export default AddtoPlaylistIcon;
