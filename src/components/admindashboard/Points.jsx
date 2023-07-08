import React from "react";
import "./points.css";

const Points = (props) => {
  const { data } = props;
  return (
    <div className="points-root">
      <h2>
        Reports<span></span>
      </h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>IP Address</th>
              <th>Time (in seconds)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              if (row.email !== "admin@gmail.com")
                return (
                  <tr key={row.id}>
                    <td>{row.fullName}</td>
                    <td>{row.email}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.ipAddress}</td>
                    <td>{row.timer}</td>
                  </tr>
                );
              else return <></>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Points;
