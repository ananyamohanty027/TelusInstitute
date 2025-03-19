import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // Star icon
import { blogs } from "../../components/assets/data/data"; // Import blogs from data.js

export const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog

  // Function to handle blog selection
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  // Function to go back to the blog list
  const handleBackClick = () => {
    setSelectedBlog(null);
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <section className='courses'>
        <div className='w-4/5 m-auto'>
          <div className='heading text-center py-12'>
            <h1 className='text-3xl font-semibold text-black'>
              Insights from Telus Institute <br />
              <span className='text-primary'>Shaping the Future of Education</span>
            </h1>
            <span className='text-sm mt-2 block'>
              Explore our thoughts on student achievements, world education, and more.
            </span>
          </div>

          {/* Blog List */}
          {!selectedBlog && (
            <div className='grid grid-cols-3 gap-5 md:grid-cols-1'>
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className='box rounded-lg shadow-shadow1 bg-white cursor-pointer'
                  onClick={() => handleBlogClick(blog)}
                >
                  <div
                    className='images rounded-t-lg relative overflow-hidden h-40 w-full'
                    style={{
                      backgroundImage: `url(${blog.cover})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className='absolute inset-0 bg-black bg-opacity-30'></div>
                  </div>
                  <div className='text p-3'>
                    <span className='text-[12px] bg-backbg p-1 px-3 text-white rounded-[5px]'>
                      {blog.topic}
                    </span>
                    <h3 className='text-black my-4 font-medium h-10'>{blog.title}</h3>
                    <div className='user flex items-center justify-between'>
                      <div className='flex items-center'>
                        <img
                          className='rounded-full w-7 h-7 object-cover shadow-shadow1'
                          src={blog.authorImage}
                          alt={blog.author}
                        />
                        <span className='text-[14px] ml-2'>{blog.author}</span>
                      </div>
                      <div className='flex items-center'>
                        {renderStars(blog.rating)} {/* Render stars based on rating */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Blog Details */}
          {selectedBlog && (
            <div className='selected-blog bg-white p-6 rounded-lg shadow-shadow1'>
              <button
                onClick={handleBackClick}
                className='text-primary hover:text-black transition-all duration-300 mb-4'
              >
                &larr; Back to Blogs
              </button>
              <div
                className='images rounded-t-lg relative overflow-hidden h-40 w-full'
                style={{
                  backgroundImage: `url(${selectedBlog.cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className='absolute inset-0 bg-black bg-opacity-30'></div>
              </div>
              <div className='text p-3'>
                <span className='text-[12px] bg-backbg p-1 px-3 text-white rounded-[5px]'>
                  {selectedBlog.topic}
                </span>
                <h3 className='text-black my-4 font-medium'>{selectedBlog.title}</h3>
                <p className='text-gray-600'>{selectedBlog.content}</p>
                <div className='user flex items-center justify-between mt-4'>
                  <div className='flex items-center'>
                    <img
                      className='rounded-full w-7 h-7 object-cover shadow-shadow1'
                      src={selectedBlog.authorImage}
                      alt={selectedBlog.author}
                    />
                    <span className='text-[14px] ml-2'>{selectedBlog.author}</span>
                  </div>
                  <div className='flex items-center'>
                    {renderStars(selectedBlog.rating)} {/* Render stars based on rating */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};