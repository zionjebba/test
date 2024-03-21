import React, { useEffect, useState, useContext } from "react";
import PageHeader from "../components/PageHeader";
import { Link, useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);


const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";
  const [job, setJob] = useState([]);
  useEffect(() => {
  

    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);
  console.log(job.summary);

 const handleApply = async (id) => {
  // Show Swal alert with input field and file input
  const { value: file } = await Swal.fire({
    title: 'Upload your CV',
    input: 'file',
    inputAttributes: {
      accept: 'application/pdf',
      'aria-label': 'Upload your CV'
    }
  });

  if (file) {
    // Create FormData object to send file to server
    const formData = new FormData();
    formData.append('resume', file);
    let currentDate = new Date();
    let date = currentDate.toISOString().slice(0, 10);

    // Append other data to FormData object
    formData.append('applicantEmail', user?.email);
    formData.append('recruiterEmail', job.postingBy);
    formData.append('jobId', job._id);
    formData.append('status', 'pending');
    formData.append('dateOfApplication', date);
    formData.append('CompanyName', job.companyName);
    formData.append('JobPosition', job.jobTitle);

    try {
      const response = await fetch("http://localhost:5000/application", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      
      Swal.fire({
        icon: "success",
        title: "Hurray...",
        text: result?.data?.message
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong."
      });
    }
  }
};


  return (
    <div className="container flex font-sans justify-center px-4 mx-auto max-w-screen-2xl xl:px-24  shadow-lg">
      <section className="w-8/12 bg-grey-300 m-8  rounded-lg border-2 bg-[url('../assets/bgone.jpeg')] border-slate-500 p-9 drop-shadow-xl">
        <div>
          <h1 className="mb-3 text-4xl italic font-bold underline text-gray-600">
            {job.jobTitle}
          </h1>
          <div className="flex items-center gap-6 py-3 w-100">
            <img src={job.companyLogo} alt="logo" className="w-50" />

            <h2 className="text-3xl italic font-semibold text-gray-700">
              {job.companyName}
            </h2>
          </div>
          <div>
            <h3 className="py-3 italic font-semibold text-gray-700 text-md">
              Time Posted: {job.postingDate}
            </h3>
          </div>
          <hr className="mb-4 m" />
          <div className="flex my-6 text-sm gap-9"> 
            <h3 className="h-5 text-center font-bold bg-cyan-500 text-white rounded w-28 p-auto">
              {job?.experienceLevel ?? "none"}
            </h3>
            <h3 className="h-5 text-center font-bold bg-cyan-500 rounded text-white w-28 p-auto">
              {job?.jobLocation ?? "none"}
            </h3>
            <h3 className="h-5 text-center font-bold bg-cyan-500 rounded text-white w-28 p-auto">
              {job?.employmentType ?? "none"}
            </h3>
          </div>
          <div>
           
           
            
          </div>
        </div>

        

        <div className="">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="mt-8 text-3xl underline text-gray-800">Job Summary </h1>
              <p className="mt-3">{job.summary ?? "none"}</p>
            </div>

            <div>
              <h1 className="mt-8 text-3xl underline text-gray-800">Roles and Responsibilities</h1>
              <p className="mt-3">{job.summary ?? "none"}</p>
            </div>
          </div>
          <div>
            <h2 className="mt-8 underline text-3xl text-gray-800">
              Qualifications 
            </h2>

            <h3 className=" mt-3">
            {job.skills && job.skills.length > 0 ? (
              <ol>
                {job.skills.map((skill, index) => (
                  <li className="job_list" key={index}>{skill.value}</li>
                ))}
              </ol>
            ) : (
              <p>None</p> 
            )}
            </h3>
          </div>
        </div>

        
        <div className="flex flex-col gap-6 my-12">

        <button className="h-10 mb-10 font-bold text-lg text-white rounded-lg bg-blue hover:bg-red-700 transition-colors duration-500 ease-in-out w-28" onClick={() => handleApply(job._id)}> 
    Apply
</button>

          <h2 className="text-xl font-semibold ">
            Contact Information <hr />
          </h2>
          <div className="flex gap-10">
            <p>Email: {job.postingBy ?? "none"}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
