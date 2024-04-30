import React from 'react';
import { FaArrowRight, FaMotorcycle, FaCar, FaBicycle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const HeroPage = () => {
  
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/home');
  };


  return (
    <div className="hero-page">
      <style jsx>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');

        /* Base styles */
        body {
          font-family: 'Helvetica Neue', sans-serif;
          background-color: #f7fafc;
          color: #4a5568;
          margin: 0;
          padding: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Hero Page */
        .hero-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0rem;
          height: 100%;
          width: 100%;
          box-sizing: border-box; /* Include padding in the element's total width and height */
        }

        .hero-page h1 {
          font-family: 'Italianno', cursive;
          font-size: 4rem; /* Reduce font size */
          color: #6b46c1;
          margin-bottom: 1rem;
          text-align: center;
        }

        .hero-page p {
          font-size: 1.25rem;
          color: #718096;
          margin-bottom: 0; /* Remove margin-bottom */
          text-align: center;
        }

        .rental-options {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin-top: 1rem; /* Add margin-top for spacing */
          padding: 0 1rem; /* Add horizontal padding */
          box-sizing: border-box; 
        }

        .rental-option {
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          padding: 1rem;
          margin-bottom: 1rem;
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box; /* Include padding in the element's total width and height */
        }

        .rental-option svg {
          color: #6b46c1;
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .rental-option h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .rental-option p {
          font-size: 1rem;
          color: #718096;
          margin: 0;
        }

        .get-started-btn {
          background-color: #6b46c1;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          padding: 1rem 1.5rem;
          border-radius: 9999px;
          margin-top: 1rem;
          width: 100%;
          max-width: 100%;
          transition: background-color 0.3s ease;
          box-sizing: border-box; /* Include padding in the element's total width and height */
        }

        .get-started-btn:hover {
          background-color: #5a38a8;
        }
      `}</style>

      <div className="text-center mb-8">
        <h1 className="text-6xl font-cursive text-indigo-600 mb-2">Zelto</h1>
        <p className="text-xl text-gray-600">
          Elevating Mobility with Smart Rental Solutions
        </p>
      </div>

      <div className="rental-options">
        <div className="rental-option">
          <FaMotorcycle className="text-6xl text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Motorcycles</h3>
          <p className="text-gray-600 text-center">
            Explore the city with our sleek and efficient motorcycles.
          </p>
        </div>

        <div className="rental-option">
          <FaCar className="text-6xl text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Cars</h3>
          <p className="text-gray-600 text-center">
            Travel in style and comfort with our premium car rentals.
          </p>
        </div>

        <div className="rental-option">
          <FaBicycle className="text-6xl text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Bicycles</h3>
          <p className="text-gray-600 text-center">
            Eco-friendly and affordable bicycle rentals for urban exploration.
          </p>
        </div>
      </div>

      <button className="get-started-btn" onClick={handleNavigate}>
        Get Started <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default HeroPage;
