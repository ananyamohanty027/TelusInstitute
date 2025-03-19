import React from "react";
import { courses } from "../../components/assets/data/data";
import { FaBook } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import './Courses.css';

export const Courses = () => {
  return (
    <course>
      <section className="courses bg-[#F3F4F8] py-16">
        <div className="w-4/5 m-auto">
          <div className="heading mb-16">
            <h1 className="text-3xl font-semibold text-black">
              Find The Right <br />
              Online Course For You
            </h1>
            <span className="text-sm mt-2 block">
              You don't have to struggle alone, you've got our assistance and help.
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((item) => (
              <div key={item.id} className="box rounded-lg shadow-shadow1 bg-white">
                <div className="content">
                  <div className="images rounded-t-lg relative overflow-hidden h-40 w-full">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300"
                    />
                    <div className="categ flex gap-4 absolute top-0 m-3">
                      <span className="text-[14px] bg-blue-700 p-1 px-3 text-white rounded-[5px] shadow-md">
                        {item.category1}
                      </span>
                      <span className="text-[14px] bg-pink-700 p-1 px-3 text-white rounded-[5px] shadow-md">
                        {item.category2}
                      </span>
                    </div>
                  </div>
                  <div className="text p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaBook />
                        <span className="text-[14px] ml-2">{item.lessons} lessons</span>
                      </div>
                      <div className="flex items-center">
                        <AiFillStar className="text-orange-500" />
                        <span className="text-[14px] ml-2">{item.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-black my-4 font-medium h-10">{item.title}</h3>
                    <div className="user flex items-center">
                      <img
                        className="rounded-full w-10 h-10 object-cover"
                        src={item.instructorImage}
                        alt={item.instructorName}
                      />
                      <span className="text-[14px] ml-2">{item.instructorName}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 p-3">
                    <span className="text-lg font-semibold text-blue-600">
                      ₹{item.price}
                    </span>
                    <NavLink to={`/course/${item.id}`} className="text-[14px] ml-2 flex items-center text-blue-600 hover:text-blue-800">
                      Know Details <HiOutlineArrowNarrowRight className="ml-2" />
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </course>
  );
};