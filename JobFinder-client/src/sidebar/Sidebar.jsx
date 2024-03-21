import React from "react";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingData from "./JobPostingData";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className="p-4 mb-2 space-x-2 text-lg">
      <h3 className="mb-2 text-lg font-bold">Filters</h3>
      <Location handleChange={handleChange} />
      <Salary handleChange={handleChange} handleClick={handleClick} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
