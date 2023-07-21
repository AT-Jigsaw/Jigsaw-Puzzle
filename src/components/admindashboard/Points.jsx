import React, { useState } from "react";
import "./points.css";

const Points = (props) => {
  const [sortOrder, setSortOrder] = useState(true);
  const { data } = props;

  data.forEach((item) => {
    if (!item.hasOwnProperty("timer")) {
      item.timer = Infinity;
    }
  });

  const sortedData = [...data].sort((a, b) =>
    sortOrder ? a.timer - b.timer : b.timer - a.timer
  );

  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  return (
    <div className="points-root">
      <h2>
        Points<span></span>
      </h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>IP Address</th>
              <th onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
                Time (in seconds){sortOrder === false ? "↓" : "↑"}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => {
              if (row.email !== "americantourister876@gmail.com") {
                return (
                  <tr key={row.id}>
                    <td>{row.fullName}</td>
                    <td>{row.email}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.ipAddress}</td>
                    <td>{row.timer === Infinity ? "N/A" : row.timer}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Points;
