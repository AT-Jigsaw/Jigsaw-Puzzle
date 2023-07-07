import React from "react";
import "./points.css";

const Points = () => {
  const data = [
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
    {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ip: "192.168.0.1",
      points: 100,
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      ip: "192.168.0.2",
      points: 150,
    },
  ];

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
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.fullName}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.ip}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Points;
