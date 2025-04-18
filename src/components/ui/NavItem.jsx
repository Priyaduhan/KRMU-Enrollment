const NavItem = ({ icon, label, active = false, onClick }) => {
  return (
    <div
      className="flex items-center  rounded-lg transition-colors duration-200 cursor-pointer"
      style={{
        backgroundColor: active ? "#e5e7eb" : "transparent",
        color: active ? "#1f2937" : "#4b5563",
        padding: "10px 10px 10px 12px",

        margin: "4px 0",
        ...(!active && {
          ":hover": {
            backgroundColor: "#e5e7eb",
            color: "#1f2937",
          },
        }),
      }}
      onClick={onClick}
    >
      <div style={{ marginRight: "12px" }}>{icon}</div>{" "}
      <span className="text-sm font-small" style={{ fontSize: "14px" }}>
        {label}
      </span>
    </div>
  );
};

export default NavItem;
