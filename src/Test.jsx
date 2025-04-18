import React from "react";

const Test = () => {
  let test_score = 50;

  const handlewSubmit = () => {
    console.log("jhkjh");
  };

  const arr = [0, 8, 7, 6, 5, 4];

  return (
    <div
      className={`${test_score >= 50 ? "green" : "red"}`}
      style={{
        color: test_score >= 50 ? "green" : "red",
      }}
    >
      {test_score >= 50 ? "Pass" : "fail"}
    </div>
  );
};

export default Test;
