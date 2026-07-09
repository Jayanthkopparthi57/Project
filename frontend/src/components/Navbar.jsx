import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "#2b2d42",
    fontWeight: "700",
    fontSize: "15px",
    padding: "8px 10px",
    borderRadius: "6px",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "14px 22px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 18px rgba(43,45,66,0.08)",
        gap: "14px",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2b2d42",
          fontSize: "28px",
          fontWeight: "800",
          letterSpacing: "0",
        }}
      >
        Care
      </Link>

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          flex: 1,
        }}
      >
        <li>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li>
          <Link to="/FindDoctor" style={linkStyle}>Find Doctor</Link>
        </li>
        <li>
          <Link to="/Appointments" style={linkStyle}>Appointments</Link>
        </li>
        <li>
          <Link to="/Documents" style={linkStyle}>Documents</Link>
        </li>
      </ul>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Link
          to="/notifications"
          style={{
            width: "40px",
            height: "40px",
            color: "#2b2d42",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IoIosNotificationsOutline size={24} />
        </Link>
        <Link
          to="/profile"
          style={{
            width: "40px",
            height: "40px",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CgProfile size={25} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
