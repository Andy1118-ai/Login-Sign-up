import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/auth.css';
import logo from './assets/cic insurance.png'; // Update the logo import
import picture1 from './assets/picture1.jpg';
import picture2 from './assets/picture2.jpg';
import picture3 from './assets/picture3.jpg';
import CoverPage from './components/CoverPage';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Register from './components/register';

function LoginSignup() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    userType: 'customer',
    idNumber: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false
  });
  const [showSignUp, setShowSignUp] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'customer',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupStep, setSignupStep] = useState(1);

  const slides = [
    { image: picture1, description: 'Welcome to CIC EasyBima' },
    { image: picture2, description: 'Your trusted insurance partner' },
    { image: picture3, description: 'Easy insurance solutions' },
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500); // Match transition duration
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500); // Match transition duration
  }, [slides.length, isTransitioning]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle touch events
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      try {
        setIsLoading(true);
        await Promise.all(slides.map(slide => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = slide.image;
            img.onload = resolve;
            img.onerror = reject;
          });
        }));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load images');
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    const score = Object.values(requirements).filter(Boolean).length;
    const feedback = score === 5 ? 'Strong password' :
      score === 4 ? 'Good password' :
      score === 3 ? 'Fair password' :
      score === 2 ? 'Weak password' : 'Very weak password';

    return {
      score,
      feedback,
      requirements
    };
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength when password changes
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual API call
      console.log('Login attempt with:', formData);
      
      // For demo purposes, show success
      alert('Login successful!');
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.idNumber.trim()) {
      errors.idNumber = 'ID/Passport Number is required';
    } else if (formData.idNumber.length < 5) {
      errors.idNumber = 'ID/Passport Number must be at least 5 characters';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(prev => ({ ...prev, [provider.toLowerCase()]: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast(`Successfully logged in with ${provider}!`, 'success');
    } catch (error) {
      showToast(`${provider} login failed. Please try again.`, 'error');
    } finally {
      setSocialLoading(prev => ({ ...prev, [provider.toLowerCase()]: false }));
    }
  };

  const handleSignUpWithEmail = () => {
    setShowSignUp(true);
    setFormData({
      userType: 'customer',
      idNumber: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    });
    setFormErrors({});
    setLoginError('');
  };

  const validatePhoneNumber = async (phoneNumber) => {
    try {
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      
      const response = await fetch(`https://api.numverify.com/v1/validate?access_key=YOUR_API_KEY&number=${cleanNumber}`);
      const data = await response.json();
      
      if (data.valid) {
        return {
          isValid: true,
          formattedNumber: formatPhoneNumber(cleanNumber),
          countryCode: data.country_code,
          location: data.location
        };
      } else {
        return {
          isValid: false,
          error: 'Invalid phone number'
        };
      }
    } catch (error) {
      console.error('Phone validation error:', error);
      return {
        isValid: false,
        error: 'Failed to validate phone number'
      };
    }
  };

  const handleInputFocus = (e) => {
    const input = e.target;
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('focused');
    
    // Add validation icon
    const existingIcon = formGroup.querySelector('.validation-icon');
    if (!existingIcon) {
      const icon = document.createElement('div');
      icon.className = 'validation-icon';
      formGroup.appendChild(icon);
    }
  };

  const handleInputBlur = (e) => {
    const input = e.target;
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('focused');
    
    // Validate on blur
    const { name, value } = input;
    if (value.trim()) {
      validateField(name, value).then(isValid => {
        const icon = formGroup.querySelector('.validation-icon');
        if (icon) {
          icon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
        }
      });
    }
  };

  const validateField = async (name, value) => {
    let error = '';
    let isValid = false;
    
    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address';
        } else {
          isValid = true;
          showToast('Valid email format!', 'success');
        }
        break;
      case 'phone':
        if (value.length < 12) {
          error = 'Please enter a complete phone number';
        } else {
          const validation = await validatePhoneNumber(value);
          if (!validation.isValid) {
            error = validation.error;
          } else {
            isValid = true;
            showToast('Phone number validated!', 'success');
          }
        }
        break;
      case 'password':
        const strength = checkPasswordStrength(value);
        if (strength.score < 3) {
          error = 'Please choose a stronger password';
        } else {
          isValid = true;
          showToast(`Password strength: ${strength.feedback}`, 'success');
        }
        break;
      case 'confirmPassword':
        if (value !== signupData.password) {
          error = 'Passwords do not match';
        } else {
          isValid = true;
          showToast('Passwords match!', 'success');
        }
        break;
    }
    
    if (error) {
      setSignupErrors(prev => ({
        ...prev,
        [name]: error
      }));
      return false;
    }
    
    return true;
  };

  const handleSignupInputChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
      
      if (processedValue.length === 12) {
        const validation = await validatePhoneNumber(processedValue);
        if (!validation.isValid) {
          setSignupErrors(prev => ({
            ...prev,
            phone: validation.error
          }));
        } else {
          processedValue = validation.formattedNumber;
          setSignupErrors(prev => ({
            ...prev,
            phone: ''
          }));
          
          // Show success toast for valid phone number
          showToast('Phone number validated successfully!', 'success');
        }
      }
    }

    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    if (name === 'password') {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
      
      // Show feedback toast for password strength
      if (strength.score >= 4) {
        showToast('Strong password!', 'success');
      }
    }

    if (signupErrors[name]) {
      setSignupErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const nextStep = () => {
    if (signupStep === 1) {
      const errors = validatePersonalInfo();
      if (Object.keys(errors).length > 0) {
        setSignupErrors(errors);
        return;
      }
    } else if (signupStep === 2) {
      const errors = validateAccountInfo();
      if (Object.keys(errors).length > 0) {
        setSignupErrors(errors);
        return;
      }
    }
    setSignupStep(prev => prev + 1);
  };

  const prevStep = () => {
    setSignupStep(prev => prev - 1);
  };

  const validatePersonalInfo = () => {
    const errors = {};
    if (!signupData.firstName.trim()) errors.firstName = 'First name is required';
    if (!signupData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!signupData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!signupData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(signupData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    return errors;
  };

  const validateAccountInfo = () => {
    const errors = {};
    if (!signupData.password) {
      errors.password = 'Password is required';
    } else if (passwordStrength.score < 3) {
      errors.password = 'Please choose a stronger password';
    }
    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!signupData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    return errors;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignupForm();
    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('Account created successfully!', 'success');
      setShowSignUp(false);
    } catch (error) {
      showToast('Failed to create account. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateSignupForm = () => {
    const errors = {};
    if (!signupData.firstName.trim()) errors.firstName = 'First name is required';
    if (!signupData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!signupData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!signupData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(signupData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!signupData.password) {
      errors.password = 'Password is required';
    } else if (signupData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!signupData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    return errors;
  };

  return (
    <div className="split-screen">
      <div className="left-screen">
        {/* Background image is handled via CSS */}
      </div>
      <div className="right-screen">
        <div className="login-container">
          <img src={logo} alt="CIC Logo" className="logo" />
          <h1>Sign in to CIC EasyBima</h1>
          <p className="tagline">Getting insured with us is easy as 1-2-3</p>

          {loginError && (
            <div className="error-message">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="user-type">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="customer"
                  checked={formData.userType === 'customer'}
                  onChange={handleInputChange}
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="intermediary"
                  checked={formData.userType === 'intermediary'}
                  onChange={handleInputChange}
                />
                Intermediary
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="idNumber">ID/Passport Number *</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                placeholder="Enter your ID/Passport Number"
                className={formErrors.idNumber ? 'error' : ''}
                required
                style={{ width: '100%' }} // Reset width to full
              />
              {formErrors.idNumber && (
                <span className="error-text">{formErrors.idNumber}</span>
              )}
            </div>

            <div className="form-group password-toggle">
              <label htmlFor="password">Password</label>
              <div className="password-input-container" style={{ position: 'relative' }}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={formErrors.password ? 'error' : ''}
                  required
                  style={{ paddingRight: '40px', width: 'calc(100% - 50px)' }} // Adjust width to fit toggle button
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {passwordVisible ? '🙈' : '👁️'}
                </button>
              </div>
              {formErrors.password && (
                <span className="error-text">{formErrors.password}</span>
              )}
            </div>

            <div className="form-options">
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              className={`btn modern-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
              style={{
                backgroundColor: 'maroon',
                color: 'white',
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? <span className="spinner"></span> : 'Sign In'}
            </button>
          </form>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element with id 'root' not found. Ensure it exists in index.html.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // Temporarily remove StrictMode for debugging
    // <React.StrictMode>
    <AppWrapper />
    // </React.StrictMode>
  );
}

// Add a fallback UI for debugging
console.log("React application is rendering...");
