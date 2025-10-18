/* This is a React form where a student fills their details like name, DOB, gender, email, phone, address, 
   uploads a photo, and then the data is sent to the backend */

import React, { useState } from 'react'; // import React and useState hook for state management
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap CSS for styling
import { ToastContainer, toast } from 'react-toastify'; // import toast for popup messages
import 'react-toastify/dist/ReactToastify.css'; // import toast CSS

function AdmissionForm() {
  // State to store all the student form data
  const [formData, setFormData] = useState({
    fullName: '',       // student's first name
    middleInitial: '',  // student's middle initial (optional)
    lastName: '',       // student's last name
    dob: '',            // date of birth
    gender: '',         // male, female, or other
    email: '',          // email address
    phone: '',          // phone number
    address: '',        // home address
    nationality: '',    // nationality
    location: '',       // student location
    photo: '',          // photo stored as base64 string
  });

  const [previewUrl, setPreviewUrl] = useState(null); // to show photo preview
  const [submitting, setSubmitting] = useState(false); // to show "Submitting..." while sending data

  // save whatever the user types or uploads into the form
  const handleChange = (e) => {
    const { name, value, type, files } = e.target; // get input details

    if (type === 'file') {
      // if user uploads a photo
      const file = files[0]; // take the first uploaded file
      if (file) {
        const reader = new FileReader(); //that can read a file and turn it into a string that the computer understands.
        reader.onloadend = () => {
          setPreviewUrl(reader.result); // show photo on form
          setFormData({ ...formData, photo: reader.result }); // save photo in formData as base64
        };
        reader.readAsDataURL(file); // convert photo to base64 string
      } else {
        // if no file is selected
        setPreviewUrl(null); // remove preview
        setFormData({ ...formData, photo: '' }); // clear photo
      }
    } else {
      // if user types in input fields
      setFormData({ ...formData, [name]: value }); // update formData
    }
  };



  // This function sends the form data to the backend when the user clicks submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // it stops the page from reloading

    // Check all required fields are filled (middleInitial is optional)
    const valid = Object.entries(formData).every(([key, value]) => {
      if (key === 'middleInitial') return true; // skip middleInitial
      return value !== ''; // all other fields must not be empty
    });

    if (!valid) {
      toast.error('❌ Please fill all required fields!'); // show error message if not valid
      return; // stop submission
    }

    setSubmitting(true); // show "Submitting..." on button

    try {
      // Send formData to backend API
      const res = await fetch('http://localhost:8000/api/admission/', {
        method: 'POST', // HTTP POST method
        headers: { 'Content-Type': 'application/json' }, // send JSON data
        body: JSON.stringify(formData), // convert formData to JSON string
      });

      const result = await res.json(); // get response from backend

      if (!res.ok) {
        toast.error('❌ Error: ' + result.message); // show error if backend returns error
      } else {
        toast.success('✅ Form submitted!'); // show success message

        // clear all form fields after successful submission
        setFormData({
          fullName: '',
          middleInitial: '',
          lastName: '',
          dob: '',
          gender: '',
          email: '',
          phone: '',
          address: '',
          nationality: '',
          location: '',
          photo: '',
        });
        setPreviewUrl(null); // remove photo preview
      }
    } catch (error) {
      toast.error('❌ Submission failed'); // show error if fetch fails
      console.error(error);
    }

    setSubmitting(false); // stop "Submitting..." button
  };

  return (
    <div className="container my-5 border p-5 bg-white rounded shadow">
      {/* Toast container to show popup messages */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Logo and form heading */}
      <div className="text-center mb-4">
        <img src="src/assets/logo.jpg" alt="University Logo" width="150" /> {/* university logo */}
        <h3 className="mt-3">University Admission Form</h3>
        <p>
          <strong>Student ID:</strong> ___________ <em>(For office use only)</em>
        </p>
      </div>

      {/* Form starts */}
      <form onSubmit={handleSubmit}>
        <h5 className="mb-3">1. Personal Information</h5>

        {/* Name fields */}
        <div className="row mb-3">
          {/* Full Name */}
          <div className="col-md-4">
            <label className="form-label">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Middle Initial */}
          <div className="col-md-4">
            <label className="form-label">Middle Initial</label>
            <input
              type="text"
              className="form-control"
              name="middleInitial"
              value={formData.middleInitial}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="col-md-4">
            <label className="form-label">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* DOB, Gender, Photo */}
        <div className="row mb-3">
          {/* Date of Birth */}
          <div className="col-md-4">
            <label className="form-label">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender Radio Buttons */}
          <div className="col-md-4">
            <label className="form-label d-block">
              Gender <span className="text-danger">*</span>
            </label>
            {['male', 'female', 'other'].map((g) => (
              <div className="form-check form-check-inline" key={g}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                  checked={formData.gender === g}
                  required
                />
                <label className="form-check-label">
                  {g[0].toUpperCase() + g.slice(1)}
                </label>
              </div>
            ))}
          </div>

          {/* Photo Upload */}
          <div className="col-md-4">
            <label className="form-label">
              Photo <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="photo"
              onChange={handleChange}
              required
            />
            {/* Show preview of uploaded photo */}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: '150px' }}
              />
            )}
          </div>
        </div>

        {/* Location and Nationality */}
        <div className="row mb-3">
          {/* Student Location */}
          <div className="col-md-4">
            <label className="form-label">
              Student Location <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nationality Dropdown */}
          <div className="col-md-4">
            <label className="form-label">
              Nationality <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            >
              <option value="">Select an item</option>
              <option>Indian</option>
              <option>Australian</option>
              <option>American</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <h5 className="mt-4 mb-3">2. Student's Contact Information</h5>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="form-label">
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">
            Address <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={submitting} // disable button while submitting
        >
          {submitting ? 'Submitting...' : 'Submit'} {/* show "Submitting..." when sending */}
        </button>
      </form>
    </div>
  );
}

export default AdmissionForm; // export component to use in App.js
