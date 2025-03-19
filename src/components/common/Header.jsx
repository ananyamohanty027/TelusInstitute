import React from "react";
import LogoImg from "../assets/images/logo-black.png"; // Update the path to your logo
import { LinkData } from "../assets/data/data";
import { NavLink, Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";

export const Header = () => {
  return (
    <header className="bg-white py-2 text-black sticky z-50 shadow-md top-0 left-0 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and TelusInstitute Text */}
        <div className="logo flex items-center gap-2">
          <img src={LogoImg} alt="logo" className="h-8 md:h-10" />
          <p className="m-0 font-extrabold text-[28px] tracking-wide">
            <span style={{ color: "red", fontSize: "32px", fontWeight: "bold" }}>T</span>elus
            <span style={{ color: "red", fontSize: "32px", fontWeight: "bold" }}>I</span>nstitute
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 text-base">
          <ul className="flex gap-4">
            {LinkData.map((link) => (
              <li key={link.id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 font-semibold border-2 border-white px-2 py-1 rounded-md"
                      : "text-[16px] hover:text-primary transition duration-300 px-2 py-1 rounded-md"
                  }
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account Section */}
        <div className="flex items-center gap-3">
          <button>
            <IoPersonSharp size={24} className="hover:text-primary transition duration-300" />
          </button>
          <Link to="/login">
            <button className="text-base hover:text-primary transition duration-300">Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};
