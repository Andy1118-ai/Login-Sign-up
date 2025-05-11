import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    idPassportNo: '',
    kraPin: '',
    nationality: '',
    postalAddress: '',
    mobileNo: '',
    email: '',
    password: '',
    agreeToTerms: false,
    consentMarketing: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <p>Welcome! Please fill in the details to create your account.</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            required
            value={`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
            onChange={(e) => {
              const [firstName, middleName, lastName] = e.target.value.split(' ');
              setFormData({ ...formData, firstName, middleName: middleName || '', lastName });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="idPassportNo">ID/Passport No</label>
          <input
            type="text"
            id="idPassportNo"
            placeholder="ID/Passport No"
            value={formData.idPassportNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kraPin">KRA Pin</label>
          <input
            type="text"
            id="kraPin"
            placeholder="KRA Pin"
            value={formData.kraPin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <select
            name="nationality"
            id="nationality"
            value={formData.nationality}
            onChange={handleChange}
          >
            <option value="">Select Nationality</option>
            <option value="Kenyan">Kenyan</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="postalAddress">Postal Address</label>
          <input
            type="text"
            id="postalAddress"
            placeholder="Postal Address"
            value={formData.postalAddress}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="text"
            id="mobileNo"
            placeholder="Mobile No"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            By creating an account you are agreeing to our Privacy Policy and Terms of Use
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="consentMarketing"
              checked={formData.consentMarketing}
              onChange={handleChange}
            />
            I consent to receiving marketing information by CIC Insurance Group.
          </label>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
