import React from "react";

const expiryDates = [
  "5mins",
  "15mins",
  "30mins",
  "60mins",
  "2hours",
  "3hours",
  "4hours",
  "5hours",
  "1day",
  "2days",
  "3days",
  "4days",
  "5days",
  "6days",
  "1week",
  "2weeks",
  "3weeks",
  "1month",
];

export const SelectExpiryDate = ({ handleSetExpiryDate }) => {
  return (
    <div style={{ color: "#32499c" }}>
      Expire{" "}
      <select
        style={{
          border: "1px solid #32499c",
          padding: "5px",
          outline: "none",
          borderRadius: "3px",
          color: "#32499c",
        }}
        onChange={(e) => handleSetExpiryDate(e.target.value)}
      >
        {expiryDates.map((date) => (
          <option key={date} value={date}>
            After {date}
          </option>
        ))}
      </select>
    </div>
  );
};
