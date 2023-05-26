import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/modal/Modal";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Modal>
      {/* Header */}
      <div className="mt-24 flex justify-center items-center gap-2">
        <img
          width={30}
          src="https://th.bing.com/th/id/OIP.Fm3l9LtbC4DdNCCZbXFn4QAAAA?pid=ImgDet&rs=1"
          alt="Logo"
        />
        <h3 className="text-white text-lg font-normal">Nexi</h3>
      </div>
      <h1 className="text-4xl font-normal text-white text-center my-5">
        Welcome
      </h1>

      <div className="text-center">
        <Button
          className="w-56 bg-purple-500 text-center text-white"
          onClick={() => navigate("/language")}
        >
          Get Started
        </Button>
      </div>
    </Modal>
  );
};

export default Welcome;
