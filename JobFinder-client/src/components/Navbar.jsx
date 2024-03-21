/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authuser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const isJobSeeker =
    authuser &&
    (authuser.displayName === "seeker" ||
      authuser.providerData[0]?.providerId === "google.com");
  const isEmployer = authuser && authuser.displayName === "employer";

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log(`Sign out successful`);
      })
      .catch((error) => console.log(error));
  };

  // menu toggle btn
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/home", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },

    { path: "/post-job", title: "Post A Job" },
    { path: "/application", title: "Applications" },
  ];
  return (
    <header className="container px-4 mx-auto max-w-screen-2xl xl:px-24">
      <nav className="flex items-center justify-between py-6">
        <a href="/" className="flex items-center gap-2 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobsHub</span>
        </a>

        {/* nav items */}
        <ul className="hidden gap-12 px-2 py-2 text-white rounded-full md:flex md:gap-4 bg-blue">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base ">
              {/* Conditional rendering based on user role */}
              {isJobSeeker &&
              (title === "Start a search" || title === "Applications") ? (
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active rounded-full px-8" : "px-8")}
                >
                  {title}
                </NavLink>
              ) : isEmployer && title !== "Applications" ? (
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active rounded-full px-8" : "px-8")}  
                >
                  {title}
                </NavLink>
              ) : null}
            </li>
          ))}
        </ul>

        {/* sign up signout btn */}
        <div className="hidden text-base font-medium text-primary lg:block">
          {authuser ? (
            <>
              <div className="flex items-center justify-end gap-4 mt-4">
                <div className="flex -space-x-2 overflow-hidden ">
                  {authuser?.photoURL ? (
                    <>
                      {" "}
                      <img
                        className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                        src={authuser?.photoURL}
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <img
                        className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      />
                    </>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 border rounded border-blues hover:bg-blue hover:text-white"
                >
                  Log out
                </button>
              </div>
              <div>
                {authuser ? (<p className="ml-12">{`Signed in as ${authuser.email}`}</p>):<p>out</p>}
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              {" "}
              <Link to="/login" className="px-5 py-2 border rounded">
                Log in
              </Link>
              <Link
                to="/SignUp"
                className="px-5 py-2 text-black rounded bg-blue"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* mobile menu */}
        <div className="block md:hidden">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <>
                <FaXmark className="w-5 h-5 text-primary/75" />
              </>
            ) : (
              <>
                <FaBarsStaggered className="w-5 h-5 text-primary/75" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      <div
        className={`px-4 bg-black text-white py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="py-1 text-base text-white">
              {/* Conditional rendering based on user role */}
              {isJobSeeker &&
              (title === "Start a search" || title === "Applications") ? (
                <NavLink
                  onClick={handleMenuToggler}
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              ) : isEmployer && title !== "Applications" ? (
                <NavLink
                  onClick={handleMenuToggler}
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              ) : null}
            </li>
          ))}
          {authuser && (
            <li className="py-1 text-white">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                Log out
              </button>
            </li>
          )}
        </ul>

        <div>
                {authuser ? (<p >{`Signed in as ${authuser.email}`}</p>):<p>out</p>}
              </div>
      </div>
    </header>
  );
};

export default Navbar;
