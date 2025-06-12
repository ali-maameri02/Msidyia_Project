import React, { useRef, useEffect, useState } from "react";
import TeacherCard from "./TeacherCard";
import { motion } from "framer-motion";
import { useGetTutors } from "../../api/tutor/teacher.queries";

// Import images directly
import profile1 from "../../assets/profile1.jpeg";
import profile2 from "../../assets/profile2.jpeg";
import profile3 from "../../assets/profile3.jpeg";

const profileImages = [profile1, profile2, profile3];

const TeachersList: React.FC = () => {
  const { data: teachers, isLoading, isError } = useGetTutors();

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollInterval = 3000; // 3 seconds interval
    const scrollAmount = scrollWidth / 3; // Scroll amount per interval

    const intervalId = setInterval(() => {
      setScrollPosition((prev) => {
        const newScrollPosition = (prev + scrollAmount) % scrollWidth;
        container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
        return newScrollPosition;
      });
    }, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching teachers</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center align-middle">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Verified Teachers - Connect Instantly
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-700 mb-8"
      >
        Top-notch teachers, limitless learning. Explore any interest over live
        video chat! Discover fun, social, and safe learning experiences led by
        passionate teachers.
      </motion.p>
      <div ref={containerRef} className="scroll-container">
        <div className="scroll-content">
          {teachers?.map((teacher, index) => (
            <TeacherCard
              key={teacher.id}
              image={
                teacher.user.Picture ||
                profileImages[index % profileImages.length]
              }
              name={
                teacher.user.first_name && teacher.user.last_name
                  ? `${teacher.user.first_name} ${teacher.user.last_name}`
                  : teacher.user.username
              }
              rating={0} // Placeholder
              reviews={0} // Placeholder
              subjects={teacher.qualifications.map((q) => q.toString())} // Assuming qualifications can be represented as strings
              onClick={() =>
                alert(`Starting free trial with ${teacher.user.username}`)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersList;
