// CoverPage Component
// This component serves as the landing page for the CIC Insurance Group application.
// It provides an overview of the insurance process and a button to navigate to the login page.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function CoverPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const fallbackStyle = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      textAlign: 'center',
    },
    logo: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      width: '100px',
    },
    welcomeBox: {
      margin: 'auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    stepsRow: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '20px',
    },
    step: {
      flex: '1',
      margin: '0 10px',
      padding: '10px',
      backgroundColor: '#f1f1f1',
      borderRadius: '8px',
    },
    footer: {
      marginTop: '30px',
      fontSize: '14px',
    },
  };

  return (
    <div className="page-container" style={fallbackStyle.pageContainer}>
      <img src="/assets/cic-logo.png" alt="CIC Group Logo" style={fallbackStyle.logo} />
      <div className="content-wrap">
        <div className="content">
          <div className="welcome-box" style={fallbackStyle.welcomeBox}>
            <h1>Welcome to CIC Insurance Group</h1>
            <p>We keep our word</p>
            <p>Getting Insured with us is as easy as 1-2-3</p>
            <div className="steps-row" style={fallbackStyle.stepsRow}>
              <div className="step" style={fallbackStyle.step}>
                <img src="/assets/umbrella-icon.png" alt="Step 1 Icon" style={{ width: '100px', marginBottom: '20px' }} />
                <h3 style={{ color: '#800000' }}>1</h3>
                <p style={{ fontWeight: 'bold' }}>Fill in some details</p>
                <p>Fill in basic information about yourself and what you want to cover.</p>
              </div>
              <div className="step" style={fallbackStyle.step}>
                <img src="/assets/quotation-icon.png" alt="Step 2 Icon" style={{ width: '100px', marginBottom: '20px' }} />
                <h3 style={{ color: '#800000' }}>2</h3>
                <p style={{ fontWeight: 'bold' }}>Get a quotation</p>
                <p>Pick from different quotations the cover that is best for you.</p>
              </div>
              <div className="step" style={fallbackStyle.step}>
                <img src="/assets/insurance-icon.png" alt="Step 3 Icon" style={{ width: '100px', marginBottom: '20px' }} />
                <h3 style={{ color: '#800000' }}>3</h3>
                <p style={{ fontWeight: 'bold' }}>Buy & Get Covered</p>
                <p>Buy the cover you like and enjoy the personal attention you deserve.</p>
              </div>
            </div>
            <button 
              className="get-started-btn"
              onClick={handleGetStarted}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#800000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#800000'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#800000'}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
              Let's start!
            </button>
          </div>
        </div>
      </div>
      <footer className="footer" style={fallbackStyle.footer}>
        <p>Let us guide you through your life's journey</p>
        <p>Call us directly on 0703 099 120 or Email us at callc@cic.co.ke.</p>
      </footer>
    </div>
  );
}

export default CoverPage;