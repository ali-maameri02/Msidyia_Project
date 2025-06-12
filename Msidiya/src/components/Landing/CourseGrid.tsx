import React from "react";
// import CourseCard from './CourseCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import images directly
// import image1 from '../../assets/25469811_developer_male-removebg-preview.png';
// import image2 from '../../assets/hero-img (2).png';
// import image3 from '../../assets/math.jpg';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

// Import avatar images
// import avatar1 from '../../assets/profile3.jpeg'; // Replace with actual avatar paths
// import avatar2 from '../../assets/profile2.jpeg'; // Replace with actual avatar paths
// import avatar3 from '../../assets/profile1.jpeg'; // Replace with actual avatar paths

/*
interface Course {
  category: string;
  image: string;
  author: string;
  authorAvatar: string;  // New property for author avatar
  title: string;
  learners: number;
  price: number;
  rating: number; // New property for course rating
  reviewCount: number; // New property for number of reviews
}

const courses: Course[] = [
  {
    category: "Crickettt",
    image: image1,
    author: "Loki",
    authorAvatar: avatar1,
    title: "retyuio",
    learners: 0,
    price: 9,
    rating: 3, // Example rating
    reviewCount: 15, // Example review count
  },
  {
    category: "Management",
    image: image2,
    author: "Tutor Jay",
    authorAvatar: avatar2,
    title: "Sample title",
    learners: 0,
    price: 12,
    rating: 5,
    reviewCount: 225,
  },
  {
    category: "Featured Maths",
    image: image3,
    author: "MANOJ",
    authorAvatar: avatar3,
    title: "Advanced Maths",
    learners: 0,
    price: 999,
    rating: 4,
    reviewCount: 365,
  },
];
*/

const CoursesGrid: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8 course responsive-course-grid">
      <h1 className="text-3xl font-bold mb-6 flex justify-between align-middle">
        <span>{t("Browse Trending Courses")}</span>
        <button
          className="btn btn-info bg-color1 text-white d-flex flex-row justify-around align-middle
       p-1 rounded-xl hover:bg-red-500 hover:transition-all-2s hover:ease-in-out"
          style={{ fontSize: "20px", fontWeight: "500" }}
        >
          <a href="">
            <FontAwesomeIcon icon={faEye} width={"30px"} />
            {t("View All")}
          </a>
        </button>
      </h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 Grid-course-card">
        {courses.map((course, index) => (
          <CourseCard   key={index} {...course} />
        ))}
      </div> */}
      <div className="text-center text-gray-500 text-xl mt-8">
        {t("Trending courses are not available for now")}
      </div>
    </div>
  );
};

export default CoursesGrid;
