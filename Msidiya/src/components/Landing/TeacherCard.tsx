import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

interface TeacherCardProps {
  image: string;
  name: string;
  rating: number;
  reviews: number;
  subjects: string[];
  onClick: () => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ image, name, rating, reviews, subjects, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col justify-between w-96"
    >
      <div className="flex justify-center p-4">
        <img className="w-24 h-24 rounded-full" src={image} alt={name} />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-gray-700 font-semibold text-lg">{name}</h3>
        <div className="flex justify-center items-center my-2">
          {/* Rating stars */}
          <span className="text-gray-500">
            {/* {Array.from({ length: 5 }, (_, i) => (
              // <FontAwesomeIcon key={i} icon="star" className={`mx-1 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} />
            ))} */}
          </span>
          <span className="text-sm text-gray-600 ml-2">({reviews})</span>
        </div>
        <div className="text-gray-600 text-sm mb-4">
          <p>I Can Tutor:</p>
          {subjects.map((subject, index) => (
            <p key={index} className="text-red-500">{subject}</p>
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={onClick}
          className="bg-color1 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          Free Trial
        </button>
      </div>
    </motion.div>
  );
};

export default TeacherCard;
