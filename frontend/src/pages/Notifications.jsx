import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(savedNotifications);
  }, []);

  const clearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f1e6",
        padding: "28px 16px 42px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "22px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#2b2d42",
                margin: "0 0 8px",
                fontSize: "34px",
              }}
            >
              Notifications
            </h1>
            <p
              style={{
                color: "#5f6175",
                margin: 0,
                fontSize: "16px",
              }}
            >
              Appointment booking responses will appear here.
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              style={{
                padding: "11px 16px",
                backgroundColor: "#ff9900",
                color: "#2b2d42",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "800",
              }}
            >
              Clear All
            </button>
          )}
        </div>

        
          {(
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    backgroundColor: notification.type === "success" ? "#25ff04" : "#ff0000",
                    color: "#2b2d42",
                    padding: "15px",
                    borderRadius: "8px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 7px",
                      fontSize: "18px",
                    }}
                  >
                    {notification.type === "success" ? "Success" : "Error"}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontWeight: "600",
                    }}
                  >
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default Notifications;
