import React from 'react';
import AccountDetail from './AccountDetail';

const Heading = ({ children }) => {
  return (
    <div className="h-56 header-gradient">
      <div className="text-end mr-5 pt-5">
        <AccountDetail />
      </div>
      <div className="flex items-center justify-center min-h-full">
        <h1 className="text-xl font-medium uppercase text-white">{children}</h1>
      </div>
    </div>
  );
};

export default Heading;
