import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaStar } from "react-icons/fa";
import "./About.css";

export const About = () => {
  return (
    <about>
      <section className="about py-16 bg-[#F3F4F8]">
        <div className="container1 mx-auto px-4">
          <div className="heading text-center py-12">
          <h1 className="text-4xl font-bold text-black">
  Unlock Your Potential with TelusInstitute
</h1>
<span className="text-lg mt-4 block text-gray-700">
  Transform your future with expert guidance, cutting-edge courses, and a community that empowers you to succeed. Your journey to greatness starts here.
</span>
          </div>
          {/* AboutCard Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-5">
            {/* HTML Course */}
            <AboutCard
              color="bg-[#69b3c2]"
              icon={<FaGraduationCap size={50} />}
              title="HTML Course"
              desc="Master the basics of web development with HTML."
              // image="https://via.placeholder.com/400x200"
              backgroundImage="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              rating={4.5}
              price={1000}
            />
            {/* Computer Science Course */}
            <AboutCard
              color="bg-[#efa7c2]"
              icon={<FaGraduationCap size={50} />}
              title="Computer Science"
              desc="Learn programming, algorithms, and data structures."
              // image="https://via.placeholder.com/400x200"
              backgroundImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              rating={4.8}
              price={1999}
            />
            {/* English Speaking Course */}
            <AboutCard
              color="bg-[#a878ec]"
              icon={<FaGraduationCap size={50} />}
              title="English Speaking"
              desc="Improve your communication skills in English."
              // image="https://via.placeholder.com/400x200"
              backgroundImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
              rating={4.7}
              price={2999}
            />
            {/* Business Course */}
            <AboutCard
              color="bg-[#8eef88]"
              icon={<FaGraduationCap size={50} />}
              title="Business Course"
              desc="Learn business strategies and management skills."
              // image="https://via.placeholder.com/400x200"
              backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              rating={4.9}
              price={1999}
            />
          </div>
        </div>
      </section>

    </about>
  );
};

export const AboutCard = (props) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const cardElement = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, []);

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-sm ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      ref={cardRef}
      className={`about-card box shadow-lg p-5 py-8 rounded-xl text-white hidden-card cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300 relative overflow-hidden`}
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Dynamic Image */}
        <div className="image-container rounded-lg overflow-hidden mb-5">
        </div>
        {/* Icon and Text */}
        <div className="icon flex justify-center">{props.icon}</div>
        <div className="text mt-5 text-center">
          <h4 className="text-lg font-semibold my-3">{props.title}</h4>
          <p className="text-sm">{props.desc}</p>
          {/* Star Rating */}
          <div className="flex justify-center items-center mt-3">
            {renderStars(props.rating)}
            <span className="text-sm ml-2">({props.rating})</span>
          </div>
          {/* Price */}
          <div className="mt-3 text-lg font-semibold">
            {props.price === 0 ? "Free" : `₹${props.price}`}
          </div>
        </div>
      </div>
    </div>
  );
};
