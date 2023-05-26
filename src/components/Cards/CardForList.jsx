import React from 'react';

const CardForList = ({ imgURL, desc }) => {
  return (
    <div className="flex w-36 overflow-hidden">
      <button>
        <div className="block mb-3 max-w-sm rounded-lg">
          <a href="#!">
            <img
              className="w-full h-20"
              src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
              alt=""
            />
          </a>
          <div>
            <p className="m-2 text-start text-gray-300 text-sm dark:text-neutral-200">
              {desc.length > 30 ? desc.slice(0, 30) + '...' : desc}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default CardForList;
