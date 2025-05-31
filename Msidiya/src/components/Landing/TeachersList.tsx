import React, { useRef, useEffect, useState } from 'react';
import TeacherCard from './TeacherCard';
import { motion } from 'framer-motion';

// Import images directly
import profile1 from '../../assets/profile1.jpeg';
import profile2 from '../../assets/profile2.jpeg';
import profile3 from '../../assets/profile3.jpeg';

// Add more fake teachers
const teachers = [
  {
    image: profile1,
    name: 'Nicholas Jordan',
    rating: 0,
    reviews: 0,
    subjects: ['Fine Arts'],
  },
  {
    image: profile2,
    name: 'Mary James',
    rating: 0,
    reviews: 0,
    subjects: ['Music'],
  },
  {
    image: profile3,
    name: 'Ryan Gerrard',
    rating: 0,
    reviews: 0,
    subjects: ['Engineering', 'Coding & Tech'],
  },
  {
    image: profile1,
    name: 'Susan White',
    rating: 0,
    reviews: 0,
    subjects: ['Math', 'Physics'],
  },
  {
    image: profile2,
    name: 'David Brown',
    rating: 0,
    reviews: 0,
    subjects: ['History'],
  },
  {
    image: profile3,
    name: 'Alice Green',
    rating: 0,
    reviews: 0,
    subjects: ['Biology'],
  },
];

const TeachersList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollInterval = 3000; // 3 seconds interval
    const scrollAmount = scrollWidth / 3; // Scroll amount per interval

    const intervalId = setInterval(() => {
      setScrollPosition(prev => {
        const newScrollPosition = (prev + scrollAmount) % scrollWidth;
        container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        return newScrollPosition;
      });
    }, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

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
        Top-notch teachers, limitless learning. Explore any interest over live video chat! Discover fun, social, and safe
        learning experiences led by passionate teachers.
      </motion.p>
      <div ref={containerRef} className="scroll-container">
        <div className="scroll-content">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={index}
              image={teacher.image}
              name={teacher.name}
              rating={teacher.rating}
              reviews={teacher.reviews}
              subjects={teacher.subjects}
              onClick={() => alert(`Starting free trial with ${teacher.name}`)}
            />
          ))}
          {/* Duplicate the content to make scrolling seamless */}
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={`duplicate-${index}`}
              image={teacher.image}
              name={teacher.name}
              rating={teacher.rating}
              reviews={teacher.reviews}
              subjects={teacher.subjects}
              onClick={() => alert(`Starting free trial with ${teacher.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersList;
