import React from "react";
import Heading from "../components/Heading";
import ViewAllData from "../components/ViewAllData";
import { programs } from "../utilitiy/utillities";

const ViewAllList = () => {
  return (
    <div>
      <Heading>My Programs</Heading>

      {/* List */}
      <ViewAllData data={programs} />
    </div>
  );
};

export default ViewAllList;
