import React from 'react';
import { motion } from "framer-motion";

function Contact() {
  return (
    <section className="py-5 bg-light" id="contact">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row">
          
          {/* Contact Form with fade-in from left */}
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <form action="https://formspree.io/f/xgvzybod" method="POST">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Type your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info with fade-in from right */}
          <motion.div
            className="col-md-6 mt-4 mt-md-0"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-4 shadow rounded">
              <h5>Address:</h5>
              <p>Near Naka, Bolri Panchatan, Maharashtra - 400001</p>
              <h5>Email:</h5>
              <p>info@gmail.com</p>
              <h5>Phone:</h5>
              <p>+91 77578 82278</p>
              <h5>Hours:</h5>
              <p>Mon - Thu + Sat: 9:00 AM - 2:20 PM</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
