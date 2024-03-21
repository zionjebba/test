import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import heroImage from "../../src/assets/jobshubHero.webp";
import candidateImage from "../../src/assets/candidate.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hired1 from "../../src/assets/hired1.webp";
import hired2 from "../../src/assets/hired2.webp";
import hired3 from "../../src/assets/hired3.webp";

const CustomDot = ({ onClick, active }) => (
    <span
        style={{
          display: 'inline-block',
          height: '10px',
          width: '10px',
          borderRadius: '50%',
          backgroundColor: active ? '#3B0764' : 'gray',
          margin: '0 5px',
          cursor: 'pointer'
        }}
        onClick={onClick}
    />
);
const CustomArrow = ({ direction, onClick }) => (
    <button
        style={{
          display: 'inline-block',
          backgroundColor: '#3B0764',
          width: '80px',
            height: '80px',
            borderRadius: '50%',
          color: 'white',
          fontSize: '2rem',
          cursor: 'pointer',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          [direction === 'next' ? 'right' : 'left']: '10px',
          zIndex: 2
        }}
        onClick={onClick}
    >
      {direction === 'next' ? '>' : '<'}
    </button>
);

const testimonials = [
  {
    image: hired1,
    company: "Turing",
    testimonial: 'This platform helped me secure my dream job at Turing.'
  },
  {
    image: hired2,
    company: "Uber",
    testimonial: 'Thanks to this platform, I found the perfect candidate for our team at Uber.'
  },
  {
    image: hired3,
    company: "Google",
    testimonial: 'Finding the right candidate was a breeze with this platform. Highly recommended for hiring at Google.'
  }
];

const settings = {
  dots: true,
  customPaging: (i) => <CustomDot />,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <CustomArrow direction="next" />,
  prevArrow: <CustomArrow direction="prev" />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

const Landing = () => {
  return (
    <div>
      <head>
        <title>HomePage</title>
      </head>

      <main className="min-h-screen px-10 mb-10">
        <div>
          {" "}
          <div className="container grid grid-cols-1 gap-10 py-10 mx-auto mb-12 lg:grid-cols-2">
            <section className="my-11 ">
              <div className="p-10 text-left">
                <h2 className="py-2 text-5xl  md:text-6xl">
                  JobsHub
                </h2>
                <TypeAnimation
                  sequence={[
                    "",
                    0,
                    "Browse the Job Market",
                    3000,
                    "Post Jobs for clients",
                    3000,
                    "Search for Jobs With Ease",
                    3000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ fontSize: "2em", display: "inline-block" }}
                  repeat={Infinity}
                />{" "}
                <p className="max-w-2xl py-5 leading-8 text-gray-800 text-md md:text-xl">
                  Welcome to JobsHub, Ghana's number one job site. Whether
                  you're an employer looking to attract top-tier talent, or a
                  job seeker searching for your dream job, we've got you
                  covered. Our user-friendly platform makes the job search and
                  recruitment process seamless and efficient.
                </p>
                <Link
                  to="/login"
                  class="bg-blue  text-white font-semibold py-2 px-4 rounded w-600 border hover:border-blue "
                >
                  Get started
                </Link>{" "}
              </div>
              
            </section>



                  
            <div>
              <img
                src={heroImage}
                alt="jobshub"
                className="object-cover mb-28 object-center w-full h-auto rounded-md shadow-md"
              />
            </div>
          </div>
          
          <section


            className="container relative flex flex-col  justify-between h-full mx-auto mb-16 bg-center bg-no-repeat bg-cover rounded-2xl"
            style={{
              backgroundImage: `linear-gradient( rgba(0,0,0,0.5), rgba(0,0,0,0.5) ),url(${candidateImage})`,
              backgroundSize: "cover",
            }}
          >

            
            <div className="flex flex-col justify-between h-full">
              <div
              className="flex w-3/4 mx-auto text-white"
              >
                <div className="h-full py-10 text-white w-96">
                  <h2 className="text-5xl font-bold ">Hire the best talent</h2>
                  <p className="mt-5 text-xl text-white">
                    Simplify your hiring process with JobsHub. Our platform
                    connects you with a vast pool of qualified candidates,
                    making it easier than ever to find the perfect fit for your
                    team.
                  </p>
                </div>
              </div>
              <div className="grid w-3/4 grid-cols-1 gap-10 pb-5 mx-auto mt-10 md:grid-cols-1 lg:grid-cols-3">
                <div className="p-5 space-y-2 text-white rounded-lg shadow-lg bg-blue">
                  <h3 className="text-3xl">Post Jobs</h3>
                  <p>
                    Advertise your job openings to a wide audience and attract
                    qualified candidates.
                  </p>
                </div>
                <div className="p-5 space-y-2 text-white rounded-lg shadow-lg bg-blue">
                  <h3 className="text-3xl">Find Candidates</h3>
                  <p>
                    Search our database of job seekers to find the perfect match
                    for your job openings.
                  </p>
                </div>
                <div className="p-5 space-y-2 text-white rounded-lg shadow-lg bg-blue">
                  <h3 className="text-3xl">Manage Applications</h3>
                  <p>
                    Easily manage job applications and communicate with
                    candidates through our platform.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* // What do we offer section */}
          <section className="container mx-auto mb-20">
            <div className="container mx-auto mb-10">
              <h3 className="py-5 font-sans text-5xl font-light text-center text-gray-700">
                {" "}
                What Do We Offer?
              </h3>
              <hr className="w-300px" />
              <p className="py-2 my-5 leading-8 text-center text-gray-800 text-sm sm:text-md md:text-lg lg:text-xl">
                At JobsHub, we're committed to making the job search and
                recruitment process as easy as possible. Our platform offers a
                wide range of features designed to help job seekers find their
                dream job and employers attract top-tier talent. From job
                posting and application management to personalized job
                recommendations and alerts, we've got everything you need to
                elevate your career or business.
              </p>
            </div>
            <div className="container gap-10 mx-auto lg:grid lg:grid-cols-2 my-45">
              <div className="relative p-5 mb-5 text-white transition-shadow duration-500 rounded-lg shadow-lg bg-gray-600 hover:shadow-2xl lg:mb-0">
                <div className="absolute top-0 left-0 font-bold text-white text-9xl opacity-30">
                  1
                </div>
                <h3 className="py-5 text-3xl "> Post Jobs </h3>
                <p className="py-2 leading-8 text-sm sm:text-md md:text-lg lg:text-xl">
                  Showcase your company's career opportunities to a vast pool of
                  job seekers. Our platform makes it easy to create and manage
                  job postings, ensuring you attract the best talent.
                </p>
              </div>

              <div className="lg:grid lg:grid-cols-1 lg:gap-10 text-white">
                <div className="relative p-5 transition-shadow duration-500 bg-blue rounded-lg shadow-lg hover:shadow-2xl">
                  <div className="absolute top-0 left-0 font-bold text-white text-9xl opacity-30">
                    2
                  </div>
                  <h3 className="py-5 text-3xl text-white">
                    {" "}
                    Apply To Your Dream Job{" "}
                  </h3>
                  <p className="py-2 leading-8 text-sm sm:text-md md:text-lg lg:text-xl">
                    Discover a world of opportunities with JobsHub. Our platform
                    connects you with a wide range of employers across various
                    industries and locations. Apply with just a few clicks and
                    get personalized job recommendations based on your skills
                    and preferences.
                  </p>
                </div>

                <div className="relative p-5 mt-5 transition-shadow duration-50 bg-purple-700 rounded-lg shadow-lg hover:shadow-2xl">
                  <div className="absolute top-0 left-0 font-bold text-white text-9xl opacity-30">
                    3
                  </div>
                  <h3 className="py-5 text-3xl text-white">
                    {" "}
                    User-Friendly Interface{" "}
                  </h3>
                  <p className="py-2 leading-8 text-sm sm:text-md md:text-lg lg:text-xl">
                    Our platform is designed with user experience in mind. The
                    intuitive interface makes it easy to navigate through job
                    postings, submit applications, and manage your job search or
                    recruitment process.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto mb-20">
            <h3 className="py-5 mb-10 font-sans text-5xl font-light text-center text-gray-700">
              What Some Top Candidates Say
            </h3>
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex items-center text-center">
                    <img src={testimonial.image} alt={`Profile picture ${index + 1}`}
                         className="w-full h-[700px] object-cover"/>
                    <p className="mt-2 text-4xl font-bold">{testimonial.company}</p>
                    <p className="mt-2 text-lg">{testimonial.testimonial}</p>
                  </div>
              ))}
            </Slider>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Landing;
