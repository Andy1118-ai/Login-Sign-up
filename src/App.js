import React from 'react';
import { Link } from 'react-router-dom';
import './styles/auth.css';
import logo from './assets/cic_insurance.png';

function App() {
 
  // Redirect to cover page when App component mounts return 
    <div className="app-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <img 
        src={logo} 
        alt="CIC Insurance" 
        style={{ 
          width: '200px', 
          marginBottom: '2rem'
        }} 
      />
      <h1 style={{ 
        color: '#800000', 
        marginBottom: '1.5rem',
        fontSize: '2.5rem'
      }}>Welcome to CIC EasyBima</h1>
      <p style={{ 
        fontSize: '1.2rem', 
        marginBottom: '2rem',
        maxWidth: '600px',
        color: '#333'
      }}>Your trusted insurance partner for personal and business protection solutions.</p>
      <div className="navigation-links" style={{
        display: 'flex',
        gap: '1rem'
      }}>
        <Link to="/login" style={{
          backgroundColor: '#800000',
          color: 'white',
          padding: '0.8rem 2rem',
          borderRadius: '5px',
          textDecoration: 'none',
          fontSize: '1.1rem',
          transition: 'background-color 0.3s ease'
        }}>Login</Link>
        <Link to="/register" style={{
          backgroundColor: '#f8f9fa',
          color: '#800000',
          padding: '0.8rem 2rem',
          borderRadius: '5px',
          textDecoration: 'none',
          fontSize: '1.1rem',
          border: '1px solid #800000',
          transition: 'background-color 0.3s ease'
        }}>Register</Link>
      </div>
    </div>
  ;
}

export default App;
