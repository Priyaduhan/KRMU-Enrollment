import React from "react";

const StatusCard = ({ icon, title, value }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff", // Pure white for contrast
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb", // Subtle border
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        padding: "1.5rem",
        transition: "all 200ms ease",
        cursor: "pointer",
        ":hover": {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            marginRight: "1rem",
            color: "#4f46e5", // Indigo-600 for icons
            fontSize: "24px", // Larger icons
          }}
        >
          {icon}
        </div>
        <div>
          <p
            style={{
              color: "#6b7280", // Gray-500 for subtitle
              fontSize: "14px",
              margin: 0,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </p>
          <p
            style={{
              color: "#111827", // Gray-900 for main value
              fontSize: "20px", // Slightly larger
              fontWeight: "700", // Bolder
              margin: "8px 0 0 0", // More spacing
              textAlign: "left",
            }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
