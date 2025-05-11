import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/auth.css';

function ForgotPassword() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="forgot-password-container">
      {/* Modernized back button with navigation */}
      <button
        className="back-btn"
        style={{ position: 'absolute', top: '10px', left: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
        onClick={() => navigate('/login')} // Redirect to login page
      >
        ←
      </button>
      <h2>Reset Password</h2>
      <p>Enter your ID Number and we will send you further instructions on how to reset your password.</p>
      <form>
        <div className="radio-row">
          <label>
            <input type="radio" name="userType" value="customer" defaultChecked />
            A Customer
          </label>
          <label>
            <input type="radio" name="userType" value="intermediary" />
            An Intermediary
          </label>
        </div>
        <div className="input-group">
          <input type="text" placeholder="Enter KRA PIN" required />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">Reset Password</button>
          <button type="button" className="cancel-btn">Cancel</button>
        </div>
      </form>
      <p className="help-text">
        Need help? Contact our support at callc@cic.co.ke or 0703 099 120
      </p>
    </div>
  );
}

export default ForgotPassword;