import React from "react";
import { useNavigate } from "react-router-dom";
import CardForList from "../components/Cards/CardForList";
import Heading from "../components/Heading";
import { programs } from "../utilitiy/utillities";

const RecentlyPlayed = () => {
  const navigate = useNavigate();
  return (
    <>
      <Heading>Recently Played</Heading>

      {/* My Programs */}
      <div className="m-5">
        <div className="flex justify-between mx-2">
          <p className="font-medium text-xl text-white">Today</p>
          <div>
            <button
              onClick={() => navigate("/list")}
              type="button"
              className="text-purple-500 text-sm"
            >
              VIEW ALL
            </button>
          </div>
        </div>
        <ul className="m-3 flex gap-3 overflow-auto scrollbar-hidden">
          {programs.map(({ id, imageURL, desc }) => (
            <li className="" id={id}>
              <CardForList imgURL={imageURL} desc={desc} />
            </li>
          ))}
        </ul>
      </div>

      {/* Recomendations */}
      <div className="m-3">
        <div className="flex justify-between mx-2">
          <p className="font-medium text-xl text-white">Yesterday</p>
          <div>
            <button
              onClick={() => navigate("/list")}
              type="button"
              className="text-purple-500 text-sm"
            >
              VIEW ALL
            </button>
          </div>
        </div>
        <ul className="m-3 flex gap-3 overflow-auto scrollbar-hidden">
          {programs.map(({ id, imageURL, desc }) => (
            <li className="" id={id}>
              <CardForList imgURL={imageURL} desc={desc} />
            </li>
          ))}
        </ul>
      </div>

      {/* Pakages*/}
      <div className="m-3">
        <div className="flex justify-between mx-2">
          <p className="font-medium text-xl text-white">05 May</p>
          <div>
            <button
              onClick={() => navigate("/list")}
              type="button"
              className="text-purple-500 text-sm"
            >
              VIEW ALL
            </button>
          </div>
        </div>
        <ul className="m-3 flex gap-3 overflow-auto scrollbar-hidden">
          {programs.map(({ id, imageURL, desc }) => (
            <li className="" onClick={() => navigate(`/package/${id}`)} id={id}>
              <CardForList imgURL={imageURL} desc={desc} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecentlyPlayed;
