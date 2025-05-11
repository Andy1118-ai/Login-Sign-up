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
      marginTop: '20px',
      fontSize: '14px',
    },
  };

  return (
    <div className="page-container" style={fallbackStyle.pageContainer}>
      <div className="content-wrap">
        <div className="content">
          <div className="welcome-box" style={fallbackStyle.welcomeBox}>
            <h1>Welcome to CIC Insurance Group</h1>
            <p>We keep our word</p>
            <p>Getting Insured with us is as easy as 1-2-3</p>
            <div className="steps-row" style={fallbackStyle.stepsRow}>
              <div className="step" style={fallbackStyle.step}>
                <h3>1</h3>
                <p>Fill in some details</p>
                <p>Fill in basic information about yourself and what you want to cover.</p>
              </div>
              <div className="step" style={fallbackStyle.step}>
                <h3>2</h3>
                <p>Get a quotation</p>
                <p>Pick from different quotations the cover that is best for you.</p>
              </div>
              <div className="step" style={fallbackStyle.step}>
                <h3>3</h3>
                <p>Buy & Get Covered</p>
                <p>Buy the cover you like and enjoy the personal attention you deserve.</p>
              </div>
            </div>
            <button 
              className="get-started-btn"
              onClick={handleGetStarted}
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