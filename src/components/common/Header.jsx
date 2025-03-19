import React, { useState } from "react";
import LogoImg from "../assets/images/logo-black.png"; // Update the path to your logo
import { LinkData } from "../assets/data/data";
import { NavLink, Link } from "react-router-dom";
import { IoPersonSharp, IoMenu, IoClose } from "react-icons/io5";

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="bg-white py-3 text-black sticky z-50 shadow-md top-0 left-0 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and TelusInstitute Text */}
        <div className="logo flex items-center gap-2 ml-1">
          <img src={LogoImg} alt="logo" className="h-8 lg:h-12" />
          <p className="m-1 font-extrabold text-[24px] lg:text-[32px] tracking-wide">
            <span style={{ color: "red", fontSize: "28px", fontWeight: "bold" }}>
              T
            </span>
            elus
            <span style={{ color: "red", fontSize: "28px", fontWeight: "bold" }}>
              I
            </span>
            nstitute
          </p>
        </div>

        {/* Laptop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 text-lg ml-auto pr-4">
  <ul className="flex gap-2 mr-4">
    {LinkData.map((link) => (
      <li key={link.id}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-semibold border-2 border-white px-3 py-1 rounded-md"
              : "text-[18px] hover:text-primary transition duration-300 px-3 py-1 rounded-md"
          }
          to={link.url}
        >
          {link.title}
        </NavLink>
      </li>
    ))}
  </ul>
</nav>


        {/* Laptop Account Section */}
        <div className="hidden lg:flex items-center gap-6 mr-4">
          <button>
            <IoPersonSharp
              size={28}
              className="hover:text-primary transition duration-300"
            />
          </button>
          <Link to="/login">
            <button className="text-lg hover:text-primary transition duration-300">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile/Tablet Hamburger Menu Button */}
        <div className="flex items-center lg:hidden mr-4">
          <button onClick={toggleNav}>
            {navOpen ? (
              <IoClose
                size={28}
                className="hover:text-primary transition duration-300"
              />
            ) : (
              <IoMenu
                size={28}
                className="hover:text-primary transition duration-300"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Panel */}
      <div
        className={`lg:hidden bg-white w-full shadow-md fixed top-16 left-0 h-full transform ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-center gap-4 py-4">
          {LinkData.map((link) => (
            <li key={link.id}>
              <NavLink
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 font-semibold border-2 border-white px-3 py-1 rounded-md"
                    : "text-[18px] hover:text-primary transition duration-300 px-3 py-1 rounded-md"
                }
                to={link.url}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
          <li className="flex flex-col items-center gap-2">
            <button>
              <IoPersonSharp
                size={28}
                className="hover:text-primary transition duration-300"
              />
            </button>
            <Link to="/login" onClick={() => setNavOpen(false)}>
              <button className="text-lg hover:text-primary transition duration-300">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};