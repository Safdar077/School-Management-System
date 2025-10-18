import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";   //without reload page go to unother page
import { motion } from "framer-motion";           //for animation 

// images
import college1 from "../assets/college1.png";
import college2 from "../assets/college2.png";
import college3 from "../assets/college3.png";

// other pages
import About from "./About";
import Contact from "./Contact";

// put all images in a list
const images = [college1, college2, college3];

const Home = () => {
  const navigate = useNavigate();     //page without read it work or go diff

  // if user not logged in, go to login page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {/* ---- top Section with sliding images ---- */}
      <header>
        <motion.div
          className="carousel slide"
          id="carouselExample"
          data-bs-ride="carousel"
          initial={{ opacity: 0, y: -100 }} // start hidden and up
          animate={{ opacity: 1, y: 0 }} // then fade in and slide down
          transition={{ duration: 1 }}
        >
          {/* dots under the images */}
              <div className="carousel-indicators">
                {images.map((img, i) => (
                  // make one dot for each image
                  <button
                    key={i} // unique key
                    type="button"
                    data-bs-target="#carouselExample" // link dots to the slider
                    data-bs-slide-to={i}              // dot number = slide numbe
                    className={i === 0 ? "active" : ""} // first dot is active (on)
                  />
                ))}
              </div>


          {/* images in the slider */}
          <div className="carousel-inner">
            {images.map((img, i) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <motion.img
                  src={img}
                  alt={`slide ${i + 1}`}    // name for the picture
                  className="d-block w-100"  // width full
                  style={{ height: "650px", objectFit: "cover" }}
                  initial={{ opacity: 0 }}    // strat hidden
                  animate={{ opacity: 1 }}    // then display
                  transition={{ duration: 1.5 }}
                />
              </div>
            ))}
          </div>

          {/* right arrow button */}
            <button className="carousel-control-next" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" />
            </button>

        </motion.div>
      </header>

      {/* ---- About Section ---- */}
      <div>
        <About />
      </div>

      {/* ---- Contact Section ---- */}
      <div>
        <Contact />
      </div>

      {/* ---- Footer ---- */}
      <footer className="text-center mt-5 text-white py-3 bg-dark">
        <p>© All pages are registered!!</p>
      </footer>
    </>
  );
};

export default Home;
