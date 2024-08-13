import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div style={styles.container}>
      <FaCheckCircle style={styles.icon} />
      <h2 style={styles.heading}>Payment Successful!</h2>
      <p style={styles.message}>Thank you for your purchase. Your payment has been processed successfully.</p>
      <p style={styles.message}>You will receive an email confirmation shortly.</p>
      <Link
        to="/"
        style={{ ...styles.homeButton, ...(isHovering ? styles.homeButtonHover : {}) }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Go to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "50px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  icon: {
    color: "green",
    fontSize: "50px",
    marginBottom: "20px"
  },
  heading: {
    color: "lightblue",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  message: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px"
  },
  homeButton: {
    display: "inline-block",
    padding: "15px 30px",
    backgroundColor: "lightblue",
    color: "#0000FF",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
  homeButtonHover: {
    backgroundColor: "#87CEFA"
  }
};

export default Success;
