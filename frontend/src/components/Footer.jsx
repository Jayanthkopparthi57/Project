import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const styles = {
    footer: {
      background: "#dddddd",
      color: "#000000",
      padding: "50px 20px 20px",
      fontFamily: "Arial, sans-serif",
    },

    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "30px",
    },

    section: {
      flex: "1 1 220px",
      minWidth: "220px",
    },

    heading: {
      fontSize: "20px",
      marginBottom: "15px",
      color: "#000000",
      textTransform: "capitalize",
    },

    link: {
      display: "block",
      color: "#252627",
      textDecoration: "none",
      margin: "10px 0",
      fontSize: "15px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.logo}> Care</h2>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Patients</h3>

          <Link to="/FindDoctor" style={styles.link}>
            Find a Doctor
          </Link>

          <Link to="/My_Appointments" style={styles.link}>
            My Appointments
          </Link>

          <Link to="/Health_Records" style={styles.link}>
            Health Records
          </Link>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Services</h3>

          <Link to="/FindDoctor" style={styles.link}>
            Book Appointment
          </Link>

          <Link to="/FindDoctor" style={styles.link}>
            Online Consultation
          </Link>

          <Link to="/Health_Records" style={styles.link}>
            Medical Reports
          </Link>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Support</h3>

          <Link to="/about" style={styles.link}>
            About Us
          </Link>

          <Link to="/contact" style={styles.link}>
            Contact Us
          </Link>

          <Link to="/privacy" style={styles.link}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
