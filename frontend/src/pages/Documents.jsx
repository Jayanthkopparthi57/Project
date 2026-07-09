import React, { useEffect, useState } from "react";
import axios from "axios";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user?.id) {
      getDocuments();
    }
  }, []);

  const getDocuments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/documents/user/${user.id}`
      );
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);
    formData.append("userId", user.id);

    try {
      await axios.post(
        "http://localhost:5000/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFile(null);
      document.getElementById("fileInput").value = "";
      getDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div
    style={{
      minHeight:"100vh",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "full",
        background: "#fff",
        padding: "25px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        My Documents
      </h2>

<form
  onSubmit={uploadFile}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <input
    id="fileInput"
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    style={{
      width: "300px",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#fff7f2",
    }}
  />

  <button
    type="submit"
    style={{
      padding: "8px 18px",
      background: "#f87004",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Upload
  </button>
</form>

      {documents.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#666",
          }}
        >
          No documents uploaded.
        </p>
      ) : (
        <div>
          {documents.map((doc) => (
            <div
              key={doc._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <a
                href={`http://localhost:5000${doc.filePath}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#f87004",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
              <span
                style={{
                  color: "#333",
                  fontSize: "15px",
                }}
              >
                {doc.originalName}
              </span>
                
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
};

export default Documents;