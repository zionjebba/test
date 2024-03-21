import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";
  useEffect(() => {
    if (!user) {
      navigate(from, { replace: true });
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    console.log(data);
    fetch("http://localhost:5000/post-job", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Job Posted Successfully!");
        }
        reset();
      });
  };

  const options = [
    { value: "JavaScript", lable: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "Network Administration", label: "Network Administration" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Software Development", label: "Software Development" },
    { value: "Data Analysis", label: "Data Analysis" },
    { value: "System Administration", label: "System Administration" },
    { value: "IT Support", label: "IT Support" },
    { value: "Project Management", label: "Project Management" },
    { value: "User Experience (UX) Design", label: "UX Design" },
    { value: "DevOps", label: "DevOps" },
    { value: "Artificial Intelligence (AI)", label: "AI" },
    { value: "Machine Learning (ML)", label: "Machine Learning" },
    { value: "Help Desk", label: "Help Desk" },
    { value: "Database Administration", label: "Database Administration" },
    { value: "Networking Protocols", label: "Networking Protocols" },
    { value: "Operating Systems", label: "Operating Systems" },
    { value: "Version Control Systems", label: "Version Control Systems" },
    { value: "Agile Methodology", label: "Agile Methodology" },
    { value: "SQL", label: "SQL" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C#", label: "C#" },
    { value: "PHP", label: "PHP" },
    { value: "Bash Scripting", label: "Bash Scripting" },
    { value: "Linux", label: "Linux" },
    { value: "Windows Server", label: "Windows Server" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "GCP", label: "GCP" },
    { value: "API Development", label: "API Development" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
  ];

  return (
    <div className="container px-4 mx-auto mb-10 max-w-screen-2xl xl:px-24">
      {/* form */}
      <div className="px-4 py-10 mt-4 border lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="create-job-flex">
            {/*1st row */}
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder={"Ex: Microsoft"}
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>
          {/*2nd row */}
          <div className="create-job-flex">
            {/*1st row */}
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="number"
                placeholder={`\u20B520k`}
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="number"
                placeholder={`\u20B5120k`}
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/*third row */}
          <div className="create-job-flex">
            {/*1st row */}
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder={`Ex: Accra`}
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>
          {/*fourth row */}
          <div className="create-job-flex">
            {/*1st row */}
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                placeholder={`Ex: 2023-11-03`}
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="">Choose your experience</option>
                <option value="Graduate">Graduate</option>
                <option value="Internship">Internship</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
          </div>
          {/*5th row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="p-4 create-job-input"
              isMulti
            />
          </div>

          {/*6th row*/}
          <div className="create-job-flex">
            {/*1st row */}
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder={`Paste your company logo: URL: Https://myjob.com/img1`}
                {...register("companyLogo")}
                className="create-job-input"
              />
              <p className="block mb-2 text-sm myText ">
                Image should be 73x72
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value="">Choose your employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Summary</label>
            <textarea
              className="w-full border pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="Job Summary"
              defaultValue={""}
              {...register("summary")}
            ></textarea>
          </div>
          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Qualifications</label>
            <textarea
              className="w-full border pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="Job Qualifications"
              defaultValue={""}
              {...register("qualifications")}
            ></textarea>
          </div>
          {/* 7th row */}
          {/* Add automatic numbering to responsibilities */}
          <div className="w-full">
            <label className="block mb-2 text-lg">
              Roles and Responsibilities
            </label>
            <textarea
              className="w-full pl-3 border py-1.5 focus:outline-none"
              rows={6}
              {...register("responsibilities")}
              placeholder="Enter job responsibilities here, each separated by a new line..."
            />
          </div>

          {/*last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              value={user?.email}
              placeholder="your email"
              {...register("postingBy")}
              className="create-job-input"
            />
          </div>

          <input
            type="submit"
            className="block px-8 py-2 mt-12 font-semibold text-white rounded-sm cursor-pointer bg-blue"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
