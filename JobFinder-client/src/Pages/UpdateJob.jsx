import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import CreatableSelect from "react-select/creatable"

const UpdateJob = () => {
    const {id} = useParams();
    //console.log(id);
      const {_id,jobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,experienceLevel,companyLogo,employmentType,description,postingBy,skills} = useLoaderData()

      const[selectedOption, setSelectedOption]= useState(null);
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        data.skills=selectedOption;
        console.log(data)
        fetch(`http://localhost:5000/update-job/${id}`,{
          method: "PUT",
          headers:{"content-type": "application/json"},
          body: JSON.stringify(data)
        }).then(res=>res.json()).then((result)=>{
         console.log(result);
         if(result.acknowledged===true){
            alert('Job Updated Successfully!');
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
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        {/* form */}
        <div className='bg-gray-400 bg-opacity-40 py-10px-4 lg:px-16 mt-4' >
       
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <div className='create-job-flex'>
        {/*1st row */}
         <div className='lg:w-1/2 w-full mt-5'>
            <label className='block mb-2 text-lg'>Job Title</label>
            <input type='text' defaultValue={jobTitle} {...register('jobTitle' )} className='create-job-input'/>
         </div>
         <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Company Name</label>
            <input type='text' 
            
            defaultValue={companyName}
            placeholder={"Ex: Microsoft"} {...register('companyName' )} className='create-job-input'/>
         </div>


      </div>
       {/*2nd row */}
       <div className='create-job-flex'>
        {/*1st row */}
         <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Minimum Salary</label>
            <input type='number' 
             defaultValue={minPrice}
            placeholder={`\u20B520k`} {...register('minPrice' )} className='create-job-input'/>
         </div>
         <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Maximum Salary</label>
            <input type='number' 
            defaultValue={maxPrice}
            placeholder={`\u20B5120k`} {...register('maxPrice' )} className='create-job-input'/>
         </div>


      </div>

      {/*third row */}
      <div className='create-job-flex'>
        {/*1st row */}
         <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Salary Type</label>
            <select {...register("salaryType")} className='create-job-input'>
        <option value={salaryType}>{salaryType}</option>
        <option value="Hourly">Hourly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
         </div>
         <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Job Location</label>
            <input type='text' 
                 defaultValue={jobLocation}
            placeholder={`Ex: Accra`} {...register('jobLocation' )} className='create-job-input'/>
         </div>


      </div>
          {/*fourth row */}
          <div className='create-job-flex'>
        {/*1st row */}
        <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Job Posting Date</label>
            <input type='date' 
               defaultValue={postingDate}
            placeholder={`Ex: 2023-11-03`} {...register('postingDate' )} className='create-job-input'/>
         </div>
         <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Experience Level</label>
            <select {...register("experienceLevel")} className='create-job-input'>
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
        <CreatableSelect defaultValue={skills} onChange={setSelectedOption} options={options}className='create-job-input py-4'
        isMulti
        />

      </div>

         {/*6th row*/}
         <div className='create-job-flex'>
        {/*1st row */}
        <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Company Logo</label>
            <input type='url' 
              defaultValue={companyLogo}
            placeholder={`Paste your company logo: URL: Https://myjob.com/img1`} {...register('companyLogo' )} className='create-job-input'
           
            />
            <p className='block mb-2 text-sm myText pl-3.5'>Image should be 73x72</p>
         </div>
         <div className='lg:w-1/2 w-full'>
            <label className='block mb-2 text-lg'>Employment Type</label>
            <select {...register("employmentType")} className='create-job-input'>
        <option value={employmentType}>{employmentType}</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Temporary">Temporary</option>
      </select>
         </div>
         


      </div>

      {/* 7th row */}
      <div className="w-full">
      <label className='block mb-2 text-lg'>Job Description</label>
      <textarea className='w-full pl-3 py-1.5 focus:outline-none' 
      rows={6}
      placeholder='Job Description'
      defaultValue={description}
      
      
      {...register("description")}></textarea>

      </div>

      {/*last row */}
      <div className='w-full'>
        <label className='block mb-2 text-lg'>Job Posted By</label>
        <input type='email' 
        defaultValue={postingBy}

        placeholder='your email' {...register('postingBy' )} className='create-job-input'/>
      </div>



      <input type="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
    </form>
            
            
        </div>
    </div>
  )
}

export default UpdateJob
