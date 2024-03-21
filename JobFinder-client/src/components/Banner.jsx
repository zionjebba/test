import React from 'react'
import { FiMapPin, FiSearch } from "react-icons/fi"

const Banner = ({query,handleInputChange,handleSubmit,handleSearch}) => {
  return (
    <div className='px-4 mx-auto text-center max-w-screen-2xl containers xl:px-24 md:py-8 py-14 '>
        <h1 className='mt-0 mb-3 text-5xl font-bold text-primary '>Find your <span className='text-blue'>new job </span>today</h1>
        <p className='mb-8 text-lg text-black/70'>Thousands of jobs in the computer,engineering and technology sectors are waiting for you</p>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center gap-4 md:flex-row md:gap-0'>
                <div className='flex w-full rounded shadow-sm md:rounded-s-md ring-1 rinf-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-6600 md:w-1/2'>
                    <input type="text" name="title" id="title" placeholder='What position are you looking for?'className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-900 focus:right-0 sm:text-sm sm:leading-6'   onChange={handleInputChange} value={query}/>
                    <FiSearch className='absolute mt-2.5 ml-2 text-gray-900 '/>
                </div>
                
                <button type='submit' className='px-8 py-2 text-white rounded bg-blue md:rounded-s-none'>Search</button>
            </div>
        </form>
    </div>
  )
}

export default Banner