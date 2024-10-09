import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface CourseCardProps {
  category: string;
  image: string;
  author: string;
  authorAvatar: string; // New prop for author avatar
  title: string;
  learners: number;
  price: number;
  rating: number; // New property for course rating
  reviewCount: number; // New property for number of reviews
}

const CourseCard: React.FC<CourseCardProps> = ({ category, image, author, authorAvatar, title, learners, price, rating, reviewCount }) => {
  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 course-card-responsive">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img className="w-8 h-8 rounded-full mr-2" src={authorAvatar} alt={author} />
          <div>
            <h3 className="text-gray-700 font-semibold">{author}</h3>
            <div className="flex items-center">
              {Array(5).fill(0).map((_, i) => (
                i < rating ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600 text-sm">({reviewCount})</span>
            </div>
          </div>
        </div>
        <h2 className="text-gray-800 text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-2">Total no of learners: {learners}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-bold text-xl">${price}</span>
          <button className="bg-color1 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
