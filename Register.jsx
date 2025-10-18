import React, { useState } from "react";
import { useNavigate } from "react-router-dom";          // move to another page without reload
import { toast, ToastContainer } from "react-toastify";  // show nice messages success or error
import "react-toastify/dist/ReactToastify.css";          // toast styles
import { Container, Row, Col, Form, Button } from "react-bootstrap"; // layout + styling
import { motion } from "framer-motion";                  // animation library
import "bootstrap/dist/css/bootstrap.min.css";           // bootstrap css

function Register() {
  // save user data (name, email, password) inside state
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();  // to move to login page after register

  // when user types, update state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // when user clicks "Register"
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields"); // check empty fields
      return;
    }
    try {
      // send data to backend Django API
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // send name, email, password
      });

      const data = await response.json();  //replay from backend

      if (response.ok) {      // if register ok 
        toast.success(data.message || "Registered successfully"); // success msg
        setForm({ name: "", email: "", password: "" }); // clear form
        setTimeout(() => navigate("/login"), 1500); // go to login after 1.5 sec
      } else {
        toast.error(data.message || "Something went wrong"); // error msg
      }
    } catch {
      toast.error("Server error"); // backend not working
    }
  };

  return (
    // Full page, center everything
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 h-100">

        {/* LEFT SIDE: blue background with animation text */}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center bg-primary text-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}   // start from left and hidden
            animate={{ x: 0, opacity: 1 }}      // move to center and visible
            transition={{ duration: 0.6 }}      // animation speed
            className="text-center px-5"
          >
            <h1 className="fw-bold">Adventure starts here</h1>
            <p className="mt-3">Join our school by creating an account</p>
          </motion.div>
        </Col>

        {/* RIGHT SIDE: Register Form */}
        <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
          <motion.div
            initial={{ x: 100, opacity: 0 }}   // start from left and hidden
            animate={{ x: 0, opacity: 1 }}     // move to center and visible
            transition={{ duration: 0.6 }}      // animation speed
            className="w-100"
            style={{ maxWidth: "400px" }}      // form width small
          >
            <div className="text-center mb-4">
              {/* School Logo */}
              <img src="src/assets/logo.jpg" alt="Logo" className="mb-3" width="150" />
              <h4>Create a new account</h4>
            </div>

            {/* FORM */}
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Register Button */}
              <div className="d-grid mb-3">
                <Button type="submit" variant="primary">Register</Button>
              </div>

              {/* Already account? link */}
              <div className="text-center">
                <span className="text-muted">Already have an account? </span>
                <a href="/login" className="text-primary">Login</a>
              </div>
            </Form>
          </motion.div>
        </Col>
      </Row>
      <ToastContainer /> {/* for showing success/error messages */}
    </Container>
  );
}

export default Register;
