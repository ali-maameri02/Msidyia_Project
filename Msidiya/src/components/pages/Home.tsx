import React from 'react';
import BookingSteps from '../Landing/BookingSteps';
import HeroSection from '../Landing/HeroSection';
import NewsLetter from '../Landing/NewsLetter';
import TeachersList from '../Landing/TeachersList';
import Services from '../Landing/Services';
import Testimonials from '../Landing/Testimonials';
import CoursesGrid from '../Landing/CourseGrid';
import Footer from "../Landing/Footer";
import NavBar from "../Landing/NavBar"
import OfferCards from '../Landing/OfferCards ';
import { CartProvider } from '../Landing/context/CartContext';

const Home: React.FC = () => {
  return (
    <>
        <CartProvider>

     <NavBar />
      <HeroSection />
      <Services />
      <CoursesGrid />
      {/* <BookingSteps /> */}
     
      <TeachersList />
      <OfferCards />
      <Testimonials />
      {/* <NewsLetter /> */}
      <Footer />
      </CartProvider>

    </>
  );
};

export default Home;
