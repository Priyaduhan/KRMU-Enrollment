import React from "react";

const NavItem = ({
  icon,
  label,
  active = false,
  onClick,
  isLogout = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        cursor: "pointer",
        padding: "12px 16px",
        backgroundColor: active ? "#f3f4f6" : "transparent",
        color: active ? "#111827" : "#4b5563",
        fontWeight: active ? "600" : "500",
        ...(!active &&
          !isLogout && {
            ":hover": {
              backgroundColor: "#f3f4f6",
              color: "#111827",
            },
          }),
        ...(isLogout && {
          marginTop: "auto",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "16px",
          color: "#ef4444",
          ":hover": {
            backgroundColor: "#fee2e2",
          },
        }),
      }}
      onClick={onClick}
    >
      <div
        style={{
          marginRight: "12px",
          display: "flex",
          alignItems: "center",
          color: isLogout ? "#ef4444" : active ? "#4f46e5" : "#6b7280",
        }}
      >
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span
        style={{
          fontSize: "14px",
          letterSpacing: "0.25px",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default NavItem;
