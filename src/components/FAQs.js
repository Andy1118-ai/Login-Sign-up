import React from 'react';
import { Link } from 'react-router-dom';
import FAQSection from './shared/FAQSection';
import '../styles/auth.css';
import cicLogo from '../assets/cic_insurance.png';

const FAQs = () => {
  return (
    <div className="page-container">
      {/* Header with logo and navigation */}
      <header className="cover-header">
        <div className="logo">
          <img src={cicLogo} alt="CIC GROUP" />
        </div>
        <div className="cover-nav">
          <Link to="/" className="nav-link">Home</Link>
          <div className="auth-links">
            <Link to="/login" className="nav-link login-link">
              <i className="fa-regular fa-user"></i> Login
            </Link>
          </div>
        </div>
      </header>

      <div className="content-wrap">
        {/* Main FAQ Section using the shared component */}
        <FAQSection 
          showTitle={true}
          showCategories={true}
          showSearch={true}
          showContactCTA={true}
        />
      </div>

      <footer className="cic-footer">
        <div className="footer-content">
          <p>Let us guide you through your life's journey</p>
          <p className="contact-info">
            Call us directly on 0703 099 120 or Email us at callc@cic.co.ke.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FAQs; 