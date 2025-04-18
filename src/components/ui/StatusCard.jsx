import React from "react";

const StatusCard = ({ icon, title, value, bgColor, textColor }) => {
  return (
    <div
      className={`${bgColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="flex items-center">
        {/* <div className="mr-4">{icon}</div> */}
        <div>
          <p className="text-gray-600 text-sm" style={{ fontSize: "15px" }}>
            {title}
          </p>
          <p
            className={`${textColor} text-2xl font-bold text-center`}
            style={{ fontWeight: "bold", fontSize: "17px", marginTop: "5px" }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
