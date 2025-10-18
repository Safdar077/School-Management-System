
import React, { useState } from "react";                      // usestate for set email and pass
import { useNavigate } from "react-router-dom";               // For moving to another page
import { toast, ToastContainer } from "react-toastify";       // For showing success/error messages
import "react-toastify/dist/ReactToastify.css";               // Toast CSS
import { motion } from "framer-motion";                       // For animation
import { Container, Row, Col, Form, Button } from "react-bootstrap";    // Bootstrap layout andform

function Login() {
  // useState is used to hold email and password values geting from user
  const [email, setEmail] = useState("");         
  const [password, setPassword] = useState("");

  // useNavigate helps us move to another page after login
  const navigate = useNavigate();               

  // Function runs when user clicks login button
  const handleLogin = async (e) => {
    e.preventDefault(); // stops page refresh when form is submitted

    try {
      // Send email & password to backend
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST", // sending data
        headers: { "Content-Type": "application/json" }, // data type is JSON
        body: JSON.stringify({ email, password })       // actual data
      });

      const data = await response.json();     // backend reply

      // If login success
      if (response.ok) {
        toast.success(data.message || "Login successful!"); // show success message
        localStorage.setItem("user", JSON.stringify(data.user)); // save user info in browser
        setTimeout(() => navigate("/home"), 1500);       // move to home page after 1.5 sec
      } else {
        toast.error(data.message || "Invalid credentials");    // if wrong email/password
      }
    } catch {
      toast.error("Server error");  // if backend not working
    }
  };


  return (
          // Full screen container, center everything
          /*Container → comes from React-Bootstrap. It is like a big box that holds everything.

          fluid → makes the container take the full width of the screen.

        vh-100 → means height = 100% of the screen (vh = viewport height).

        d-flex → (easier to center things).

        align-items-center → centers content vertically.

        justify-content-center → centers content horizontally */
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 h-100">
        
        {/* LEFT SIDE with animation and txt */}
        {/*This column will be hidden on mobiles, but on tablets/PC it shows as half screen, with blue background, white text, and centered content.*/}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center bg-primary text-dark">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}   // start from left and hidden
            animate={{ x: 0, opacity: 1 }}      // move to center and visible
            transition={{ duration: 0.6 }}      // animation speed
            className="text-center px-5"
          >
            <h1 className="fw-bold">Adventure starts here</h1>
            <p className="mt-3">Create an account to join our community</p>
          </motion.div>
        </Col>


        {/* RIGHT SIDE with login form */}
        <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
          <motion.div 
            initial={{ x: 100, opacity: 0 }}    // start from right and hidden
            animate={{ x: 0, opacity: 1 }}      // move to center and visible
            transition={{ duration: 0.6 }}      // animation speed
            className="w-100" 
            style={{ maxWidth: "400px" }}       // form box width
          >

            {/* Top section with logo and welcome text */}
            <div className="text-center mb-4">
              <img src="src/assets/logo.jpg" alt="Logo" className="mb-3" width="150" /> {/* School logo */}
              <h4>Welcome To Our School</h4>
            </div>

            {/* LOGIN FORM */}
            <Form onSubmit={handleLogin}>
              
              {/* Email input */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} // update email state
                  required 
                />
              </Form.Group>

              {/* Password input */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} // update password state
                  required 
                />
              </Form.Group>

              {/* Login button */}
              <div className="d-grid mb-3">
                <Button type="submit" variant="primary">Login</Button>
              </div>

              {/* Register link */}
              <div className="text-center">
                <span>Don’t have an account? </span>
                <a href="/register" className="text-primary">Create Account</a>
              </div>
            </Form>
            
          </motion.div>
        </Col>
      </Row>

      {/* Toast messages appear here */}
      <ToastContainer />
    </Container>
  );
}

export default Login;
