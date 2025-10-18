import React from 'react';
import { motion } from "framer-motion";
import college1 from '../assets/college1.png';
import college2 from '../assets/college2.png';

const About = () => {
  return (
    <div id="about" className="container my-5">
      <div className="container my-5">

        {/* First Row */}
        <div className="row align-items-center mb-5">
          {/* Image with fade-in from left and hover scale */}
          <motion.div 
            className="col-md-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={college1}
              alt="School Building"
              className="img-fluid rounded shadow"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          </motion.div>

          {/* Text with fade-in from right */}
          <motion.div 
            className="col-md-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Dr. A.R. Undre English High School</h2>
            <p>
              Dr. A.R. Undre English High School is one of the most respected and well-known schools in our village.
              It is a three-floor building located in Borli Panchatan, Shriwardhan, PIN 402403. The school offers
              education from Junior KG to 12th Standard, including Science and Commerce streams for college students.
            </p>
            <p>
              We focus on core subjects such as English, Mathematics, Marathi, Drawing, and Computers. Our experienced
              teachers and friendly staff ensure that students receive a high-quality education in a nurturing environment.
            </p>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="row align-items-center">
          {/* Image with fade-in from right and hover scale */}
          <motion.div 
            className="col-md-6 order-md-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={college2}
              alt="Students Activity"
              className="img-fluid rounded shadow"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          </motion.div>

          {/* Text with fade-in from left */}
          <motion.div 
            className="col-md-6 order-md-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h4>Why Choose Our School?</h4>
            <ul>
              <li>3 to 4 school branches</li>
              <li>Classes from Nursery to 12th Grade</li>
              <li>Streams available: Science & Commerce</li>
              <li>Library, Computer Lab, and Assembly Hall</li>
              <li>Two large playgrounds (Front & Back)</li>
              <li>Focus on student growth and future success</li>
            </ul>
            <p>
              Our students have gone on to achieve great success in life. Many are placed in well-paying jobs,
              thanks to the strong foundation they received here. It is the best school in our village and a place
              where futures are built.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
