import React from 'react';
import HeroSection from '../Landing/HeroSection';
import TeachersList from '../Landing/TeachersList';
import Services from '../Landing/Services';
import Testimonials from '../Landing/Testimonials';
import CoursesGrid from '../Landing/CourseGrid';
import Footer from "../Landing/Footer";
import NavBar from "../Landing/NavBar"
import OfferCards from '../Landing/OfferCards ';
import { CartProvider } from '../Landing/context/CartContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../translate/i18n';

const Home: React.FC = () => {
  return (
    <>
          <I18nextProvider i18n={i18n}>

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
</I18nextProvider>
    </>
  );
};

export default Home;
