import Button from "../Button";
import RemovePlaylistIcons from "../RemovePlaylistIcons";
import SimpleModal from "./SimpleModal";
import CloseCircleSVG from "../../SVGS/CloseCircleSVG";

const RemoveFromPlaylistModal = ({ isOpen, onClose }) => {
  return (
    <>
      <SimpleModal
        isOpen={isOpen}
        onClose={onClose}
        closeIconRequired={false}
        className="m-12"
      >
        <h1 className="text-white text-2xl text-center">
          Remove from Playlist
        </h1>
        <p className="text-white text-xs text-center mt-1">
          your section is a part of 3 playlists
        </p>

        <div className="text-end my-5">
          <Button className="text-purple-500 text-xs border border-gray-500">
            Delete from all Playlist
          </Button>
        </div>
        <ul className="flex flex-col my-5 gap-3 max-h-60 overflow-auto">
          <li className="flex items-center justify-between">
            <div className="flex gap-3 items-center justify-center">
              <div className="bg bg-red-700  rounded-md h-6 w-6 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></div>
              <p>Playlist</p>
            </div>
            <RemovePlaylistIcons />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex gap-3 items-center justify-center">
              <div className="bg bg-red-700  rounded-md h-6 w-6 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></div>
              <p>Playlist</p>
            </div>
            <RemovePlaylistIcons />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex gap-3 items-center justify-center">
              <div className="bg bg-red-700  rounded-md h-6 w-6 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></div>
              <p>Playlist</p>
            </div>
            <RemovePlaylistIcons />
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
    </>
  );
};

export default RemoveFromPlaylistModal;
