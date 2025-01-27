import React from 'react';
import '../../index.css'; // Make sure to style the footer according to your design.

const Footer: React.FC = () => {
  return (
    <footer className="footer  bottom-0">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Msidiya - practice makes progress.</h2>
          <p>Find top-rated instructors to guide you in every step of your journey. Try a free lesson today. Tutors are waiting for you.</p>
          <button className="register-btn">Register</button>
        </div>
        <div className="footer-section">
          <h3>About Msidiya ©</h3>
          <ul>
            <li>How it works</li>
            <li>Teach with us</li>
            <li>Knowledge Base</li>
            <li>FAQ</li>
            <li>Terms and conditions</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>Webinars</li>
            <li>Categories</li>
            <li>Subjects</li>
            <li>Find tutors</li>
            <li>Sign in</li>
            <li>Sign up</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@msidiya.com</p>
          <p>Phone: +14089095136</p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
          <p><a href="#">Terms of service</a> - <a href="#">Privacy policy</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Msidiya Copyright. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
