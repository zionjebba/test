import React from "react";
import InputField from "../components/InputField";

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="mb-2 text-lg font-medium">Type of employment</h4>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          ></input>
        </label>
        <InputField
          handleChange={handleChange}
          value="temporary"
          title="Temporary"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="part-time"
          title="Part-time"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="full-time"
          title="Full-time"
          name="test"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
