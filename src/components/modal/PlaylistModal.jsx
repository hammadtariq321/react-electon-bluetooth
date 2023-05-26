import React from 'react';
import SimpleModal from './SimpleModal';
import InputField from '../InputField';
import Button from '../Button';

const PlaylistModal = ({ isOpen, onClose, heading = '' }) => {
  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} closeIconRequired={false}>
      {heading ? (
        <h3 className="text-2xl font-medium mt-10 mb-5 text-center">
          {heading}
        </h3>
      ) : (
        <h3 className="text-2xl font-medium mt-10 mb-5 text-center">
          Your New Playlist
        </h3>
      )}
      <form action="">
        <div className="p-5">
          <InputField name={'name'} label={'Name'} />
          <InputField name={'description'} label={'Description'} />

          <p className="text-sm font-medium my-5">Colour</p>
          <ul className="flex justify-center items-center gap-3">
            <li className="bg bg-red-700  rounded-full h-16 w-16 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></li>
            <li className="bg bg-blue-700  rounded-full h-16 w-16 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></li>
            <li className="bg bg-green-700  rounded-full h-16 w-16 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></li>
            <li className="bg bg-yellow-500  rounded-full h-16 w-16 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></li>
            <li className="bg bg-purple-700  rounded-full h-16 w-16 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"></li>
          </ul>

          <div className="text-center my-10">
            <Button
              className="bg-purple-500 w-72 text-white text-md"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </form>
    </SimpleModal>
  );
};

export default PlaylistModal;
