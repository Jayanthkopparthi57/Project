import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user?.role === "Doctor") {
      getDoctorDocuments();
    }

    if (user?.role === "Patient") {
      getPatientDocuments();
    }
  }, []);

  const saveNotification = (text, type) => {
    const oldNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    const newNotification = {
      id: Date.now(),
      message: text,
      type: type,
      time: new Date().toLocaleString(),
    };
    localStorage.setItem("notifications", JSON.stringify([newNotification, ...oldNotifications]));
  };

  const getPatientDocuments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/documents/user/${user.id}`);
      setDocuments(res.data);
    } catch {
      setMessage("Unable to load documents");
    }
  };

  const getDoctorDocuments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/documents/doctor/${user.id}`);
      setDocuments(res.data);
    } catch {
      setMessage("Unable to load patient documents");
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a document");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("userId", user.id);

    try {
      const res = await axios.post("http://localhost:5000/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      saveNotification("Document uploaded successfully", "success");
      setFile(null);
      document.getElementById("fileInput").value = "";
      getPatientDocuments();
    } catch {
      setMessage("Document upload failed");
      saveNotification("Document upload failed", "error");
    }
  };

  if (!user) {
    return (
      <div style={pageStyle}>
        <div style={boxStyle}>
          <h2>Documents</h2>
          <p>Please login to view documents.</p>
          <Link to="/login" style={buttonStyle}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={titleStyle}>{user.role === "Doctor" ? "Patient Documents" : "My Documents"}</h1>
        <p style={textStyle}>{user.role === "Doctor" ? "Documents from patients who booked appointments with you." : "Upload documents that your doctor can view."}</p>

        {user.role === "Patient" && (
          <form onSubmit={uploadFile} style={boxStyle}>
            <input
              id="fileInput"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>Upload</button>
          </form>
        )}

        {message && <div style={messageStyle}>{message}</div>}

        {documents.length === 0 ? (
          <div style={boxStyle}>No documents found.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "18px" }}>
            {documents.map((doc) => (
              <div key={doc._id} style={cardStyle}>
                <div>
                  <h2 style={cardTitleStyle}>{doc.originalName}</h2>
                  {user.role === "Doctor" && (
                    <div>
                      <p style={textStyle}>Patient: {doc.user?.fullName}</p>
                      <Link to={`/patients/${doc.user?._id}`} style={smallLinkStyle}>View Patient Profile</Link>
                    </div>
                  )}
                  <p style={textStyle}>Uploaded: {new Date(doc.createdAt).toLocaleString()}</p>
                </div>

                <a
                  href={`http://localhost:5000${doc.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  style={buttonStyle}
                >
                  View Document
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f1e6",
  padding: "30px 16px",
};

const titleStyle = {
  margin: "0 0 8px",
  color: "#2b2d42",
  fontSize: "34px",
};

const textStyle = {
  margin: "6px 0",
  color: "#5f6175",
};

const boxStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 8px 22px rgba(43,45,66,0.1)",
  marginBottom: "15px",
};

const cardStyle = {
  ...boxStyle,
  marginBottom: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
};

const cardTitleStyle = {
  margin: "0 0 8px",
  color: "#2b2d42",
  fontSize: "20px",
  wordBreak: "break-word",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  background: "#f7f1e6",
  border: "none",
  borderRadius: "8px",
  marginBottom: "12px",
  boxSizing: "border-box",
};

const buttonStyle = {
  display: "inline-block",
  padding: "10px 14px",
  background: "#ff9f1c",
  color: "#2b2d42",
  border: "none",
  borderRadius: "8px",
  textDecoration: "none",
  cursor: "pointer",
  fontWeight: "800",
};

const smallLinkStyle = {
  color: "#ff9f1c",
  fontWeight: "800",
  textDecoration: "none",
};

const messageStyle = {
  ...boxStyle,
  fontWeight: "800",
};

export default Documents;
